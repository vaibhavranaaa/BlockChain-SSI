package com.ssi.backend_auth.service;

import com.ssi.backend_auth.entity.IdentityWallet;
import com.ssi.backend_auth.entity.User;
import com.ssi.backend_auth.repository.IdentityWalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.KeyPair;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class IdentityWalletService {

    private final IdentityWalletRepository walletRepository;

    public IdentityWallet createWallet(User user, KeyPair keyPair) {

        String privateKey = Base64.getEncoder()
                .encodeToString(keyPair.getPrivate().getEncoded());

        String publicKey = Base64.getEncoder()
                .encodeToString(keyPair.getPublic().getEncoded());

        IdentityWallet wallet = IdentityWallet.builder()
                .userId(user.getId())
                .did(user.getDid())
                .privateKey(privateKey)
                .publicKey(publicKey)
                .build();

        return walletRepository.save(wallet);
    }
}