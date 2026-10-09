package com.ssi.backend_auth.service;

import com.ssi.backend_auth.constant.Role;
import com.ssi.backend_auth.dto.LoginRequest;
import com.ssi.backend_auth.dto.RegisterRequest;
import com.ssi.backend_auth.entity.User;
import com.ssi.backend_auth.exception.DuplicateEmailException;
import com.ssi.backend_auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.KeyPair;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final DIDService didService;
    private final IdentityWalletService identityWalletService;

    public String register(RegisterRequest request) {

        if (repository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email already exists");
        }

        String did = didService.generateDid();

        KeyPair keyPair = didService.generateKeyPair();

        String publicKey = didService.getPublicKey(keyPair);

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.STUDENT)
                .active(true)
                .did(did)
                .publicKey(publicKey)
                .build();

        repository.save(user);

        identityWalletService.createWallet(user, keyPair);

        return "User Registered Successfully";
    }



    public String login(LoginRequest request) {

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtService.generateToken(user.getEmail());
    }
}