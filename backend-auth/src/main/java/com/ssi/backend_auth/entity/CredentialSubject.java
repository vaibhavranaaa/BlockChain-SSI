package com.ssi.backend_auth.entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CredentialSubject {

    private String name;

    private String email;

    private String role;
}