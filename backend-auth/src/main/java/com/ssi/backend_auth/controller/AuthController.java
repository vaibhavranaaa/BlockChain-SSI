package com.ssi.backend_auth.controller;

import com.ssi.backend_auth.dto.LoginRequest;
import com.ssi.backend_auth.dto.RegisterRequest;
import com.ssi.backend_auth.response.ApiResponse;
import com.ssi.backend_auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping("/register")
    public ApiResponse<String> register(@Valid @RequestBody RegisterRequest request){

        return new ApiResponse<>(
                true,
                service.register(request),
                null
        );

    }

    @PostMapping("/login")
    public ApiResponse<String> login(@RequestBody LoginRequest request){

        return new ApiResponse<>(
                true,
                service.login(request),
                null
        );

    }

}