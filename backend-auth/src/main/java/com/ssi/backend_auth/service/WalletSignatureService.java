package com.ssi.backend_auth.service;

import com.ssi.backend_auth.entity.IdentityWallet;
import com.ssi.backend_auth.repository.IdentityWalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;

import java.security.Signature;

@Service
@RequiredArgsConstructor
public class WalletSignatureService {

    private final IdentityWalletRepository walletRepository;

    public String sign(String did, String data) {

        try {
            IdentityWallet wallet = walletRepository.findByDid(did)
                    .orElseThrow(() -> new RuntimeException("Wallet not found"));

            byte[] privateKeyBytes = Base64.getDecoder()
                    .decode(wallet.getPrivateKey());

            PKCS8EncodedKeySpec keySpec =
                    new PKCS8EncodedKeySpec(privateKeyBytes);

            KeyFactory keyFactory = KeyFactory.getInstance("RSA");

            PrivateKey privateKey = keyFactory.generatePrivate(keySpec);

            Signature signature = Signature.getInstance("SHA256withRSA");

            signature.initSign(privateKey);

            signature.update(data.getBytes(StandardCharsets.UTF_8));

            byte[] signedData = signature.sign();

            return Base64.getEncoder()
                    .encodeToString(signedData);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean verify(String did, String data, String digitalSignature) {

        try {
            IdentityWallet wallet = walletRepository.findByDid(did)
                    .orElseThrow(() -> new RuntimeException("Wallet not found"));

            byte[] publicKeyBytes = Base64.getDecoder()
                    .decode(wallet.getPublicKey());

            X509EncodedKeySpec keySpec =
                    new X509EncodedKeySpec(publicKeyBytes);

            KeyFactory keyFactory = KeyFactory.getInstance("RSA");

            PublicKey publicKey = keyFactory.generatePublic(keySpec);

            Signature signature = Signature.getInstance("SHA256withRSA");

            signature.initVerify(publicKey);

            signature.update(data.getBytes(StandardCharsets.UTF_8));

            byte[] signatureBytes = Base64.getDecoder()
                    .decode(digitalSignature);

            return signature.verify(signatureBytes);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}