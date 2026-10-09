package com.ssi.backend_auth.util;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;

public class RSAUtil {

    private static KeyPair keyPair;

    static {

        try {

            KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
            generator.initialize(2048);
            keyPair = generator.generateKeyPair();

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

    }

    public static KeyPair getKeyPair() {
        return keyPair;
    }

}