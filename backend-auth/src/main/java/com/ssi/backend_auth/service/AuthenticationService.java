package com.ssi.backend_auth.service;

import com.ssi.backend_auth.entity.User;
import com.ssi.backend_auth.entity.VerifiableCredential;
import com.ssi.backend_auth.repository.CredentialRepository;
import com.ssi.backend_auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final CredentialService credentialService;
    private final CredentialRepository credentialRepository;

    public boolean authenticate(String email, String credentialId) {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null || !user.isActive()) {
            return false;
        }

        if (user.getDid() == null || user.getDid().isBlank()) {
            return false;
        }

        VerifiableCredential credential = credentialRepository.findById(credentialId)
                .orElse(null);

        if (credential == null) {
            return false;
        }

        if (!user.getDid().equals(credential.getHolder())) {
            return false;
        }

        return credentialService.verifyCredential(credentialId);
    }

}