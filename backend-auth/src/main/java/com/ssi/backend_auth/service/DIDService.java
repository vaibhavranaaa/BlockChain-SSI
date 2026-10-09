package com.ssi.backend_auth.service;

import org.springframework.stereotype.Service;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.util.Base64;
import java.util.UUID;

@Service
public class DIDService {

    public String generateDid() {
        return "did:ssi:" + UUID.randomUUID();
    }

    public KeyPair generateKeyPair() {
        try {
            KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
            generator.initialize(2048);
            return generator.generateKeyPair();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String getPublicKey(KeyPair keyPair) {
        return Base64.getEncoder()
                .encodeToString(keyPair.getPublic().getEncoded());
    }
}