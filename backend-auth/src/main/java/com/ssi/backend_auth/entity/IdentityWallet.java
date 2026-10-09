package com.ssi.backend_auth.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "identity_wallets")
public class IdentityWallet {

    @Id
    private String id;

    private String userId;

    private String did;

    private String privateKey;

    private String publicKey;
}