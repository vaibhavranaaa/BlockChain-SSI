package com.ssi.backend_auth.controller;
import com.ssi.backend_auth.dto.AuthenticationRequest;
import com.ssi.backend_auth.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/authenticate")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> authenticate(
            @RequestBody AuthenticationRequest request) {

        boolean authenticated = authenticationService.authenticate(
                request.getEmail(),
                request.getCredentialId()
        );

        Map<String, Object> response = new HashMap<>();

        response.put("success", true);
        response.put("authenticated", authenticated);

        if (authenticated) {
            response.put("message", "Authentication Successful");
        } else {
            response.put("message", "Authentication Failed");
        }

        return ResponseEntity.ok(response);
    }
}