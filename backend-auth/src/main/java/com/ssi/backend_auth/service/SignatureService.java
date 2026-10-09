package com.ssi.backend_auth.service;

import com.ssi.backend_auth.util.RSAUtil;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.util.Base64;

@Service
public class SignatureService {

    public String sign(String data) {

        try {

            PrivateKey privateKey = RSAUtil.getKeyPair().getPrivate();

            Signature signature = Signature.getInstance("SHA256withRSA");

            signature.initSign(privateKey);

            signature.update(data.getBytes(StandardCharsets.UTF_8));

            byte[] signed = signature.sign();

            return Base64.getEncoder().encodeToString(signed);

        } catch (Exception e) {

            throw new RuntimeException(e);

        }

    }

    public boolean verify(String data, String digitalSignature) {

        try {

            PublicKey publicKey = RSAUtil.getKeyPair().getPublic();

            Signature signature = Signature.getInstance("SHA256withRSA");

            signature.initVerify(publicKey);

            signature.update(data.getBytes(StandardCharsets.UTF_8));

            return signature.verify(
                    Base64.getDecoder().decode(digitalSignature)
            );

        } catch (Exception e) {

            throw new RuntimeException(e);

        }

    }

}