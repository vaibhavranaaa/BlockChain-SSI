package com.ssi.backend_auth.service;

import com.ssi.backend_auth.entity.CredentialSubject;
import com.ssi.backend_auth.entity.User;
import com.ssi.backend_auth.entity.VerifiableCredential;
import com.ssi.backend_auth.repository.CredentialRepository;
import com.ssi.backend_auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

import org.hyperledger.fabric.client.Contract;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CredentialService {

    private String generateHash(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes(StandardCharsets.UTF_8));

            StringBuilder hexString = new StringBuilder();

            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);

                if (hex.length() == 1) {
                    hexString.append('0');
                }

                hexString.append(hex);
            }

            return hexString.toString();

        } catch (Exception e) {
            throw new RuntimeException("Error generating SHA-256 hash", e);
        }
    }

    private final CredentialRepository credentialRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final WalletSignatureService walletSignatureService;
    private final Contract fabricContract;


    public VerifiableCredential issueCredential(String token) {

        token = token.replace("Bearer ", "");

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CredentialSubject subject = CredentialSubject.builder()
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();

        VerifiableCredential vc = VerifiableCredential.builder()
                .issuer("did:ssi:university")
                .holder(user.getDid())
                .type(List.of(
                        "VerifiableCredential",
                        "StudentCredential"
                ))
                .credentialSubject(subject)
                .issuedAt(LocalDate.now().toString())
                .expiresAt(LocalDate.now().plusYears(1).toString())
                .signature("TEMP_SIGNATURE")
                .build();

        String data = vc.getIssuer()
                + vc.getHolder()
                + vc.getCredentialSubject().getEmail()
                + vc.getIssuedAt();

        String credentialHash = generateHash(data);
        vc.setCredentialHash(credentialHash);

        String digitalSignature = walletSignatureService.sign(
                user.getDid(),
                data
        );

        vc.setSignature(digitalSignature);

        VerifiableCredential savedCredential = credentialRepository.save(vc);

        try {
            fabricContract.submitTransaction(
                    "IssueCredential",
                    savedCredential.getId(),
                    savedCredential.getHolder(),
                    savedCredential.getIssuer(),
                    "StudentCredential",
                    savedCredential.getCredentialHash(),
                    savedCredential.getIssuedAt(),
                    savedCredential.getExpiresAt()
            );
        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to anchor credential on Hyperledger Fabric",
                    e
            );
        }

        return savedCredential;
    }

    public boolean verifyCredential(String id) {

        VerifiableCredential credential = credentialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Credential not found"));

        String data = credential.getIssuer()
                + credential.getHolder()
                + credential.getCredentialSubject().getEmail()
                + credential.getIssuedAt();

        boolean signatureValid = walletSignatureService.verify(
                credential.getHolder(),
                data,
                credential.getSignature()
        );

        if (!signatureValid) {
            return false;
        }

        try {
            byte[] result = fabricContract.evaluateTransaction(
                    "GetCredential",
                    credential.getId()
            );

            String fabricCredential = new String(result);

            return fabricCredential.contains(
                    "\"credentialHash\":\""
                            + credential.getCredentialHash()
                            + "\""
            ) && fabricCredential.contains(
                    "\"status\":\"ACTIVE\""
            );

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to verify credential on Hyperledger Fabric",
                    e
            );
        }
    }

    public boolean revokeCredential(String id) {

        VerifiableCredential credential = credentialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Credential not found"));

        try {
            fabricContract.submitTransaction(
                    "RevokeCredential",
                    credential.getId()
            );

            return true;

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to revoke credential on Hyperledger Fabric",
                    e
            );
        }
    }

    public boolean verifyTamperedCredential(String id) {

        VerifiableCredential credential = credentialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Credential not found"));

        String tamperedEmail = "tampered@example.com";

        String data = credential.getIssuer()
                + credential.getHolder()
                + tamperedEmail
                + credential.getIssuedAt();

        return walletSignatureService.verify(
                credential.getHolder(),
                data,
                credential.getSignature()
        );
    }
}