package com.ssi.backend_auth.entity;

import com.ssi.backend_auth.constant.Role;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private String id;

    private String name;

    private String email;

    private String password;

    private Role role;

    private boolean active;

    private String did;

    private String publicKey;
}