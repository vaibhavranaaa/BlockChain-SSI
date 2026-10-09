package com.ssi.backend_auth.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "credentials")
public class VerifiableCredential {

    @Id
    private String id;

    private String issuer;

    private String holder;

    private List<String> type;

    private CredentialSubject credentialSubject;

    private String issuedAt;

    private String signature;

    private String credentialHash;

    private String expiresAt;
}