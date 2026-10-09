package com.ssi.backend_auth.repository;

import com.ssi.backend_auth.entity.IdentityWallet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface IdentityWalletRepository extends MongoRepository<IdentityWallet, String> {

    Optional<IdentityWallet> findByUserId(String userId);

    Optional<IdentityWallet> findByDid(String did);
}