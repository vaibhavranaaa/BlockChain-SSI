package com.ssi.backend_auth.repository;

import com.ssi.backend_auth.entity.VerifiableCredential;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CredentialRepository extends MongoRepository<VerifiableCredential, String> {
}