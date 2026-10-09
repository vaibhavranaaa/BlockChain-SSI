package com.ssi.backend_auth.controller;

import com.ssi.backend_auth.entity.VerifiableCredential;
import com.ssi.backend_auth.response.ApiResponse;
import com.ssi.backend_auth.service.CredentialService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/credentials")
@RequiredArgsConstructor
public class CredentialController {

    private final CredentialService credentialService;

    @PostMapping("/issue")
    public ApiResponse<VerifiableCredential> issueCredential(
            @RequestHeader("Authorization") String token) {

        return new ApiResponse<>(
                true,
                "Credential Issued Successfully",
                credentialService.issueCredential(token)
        );
    }

    @GetMapping("/verify/{id}")
    public ApiResponse<Boolean> verifyCredential(@PathVariable String id) {

        return new ApiResponse<>(
                true,
                "Credential Verification",
                credentialService.verifyCredential(id)
        );
    }

    @PutMapping("/revoke/{id}")
    @PreAuthorize("hasAnyRole('ISSUER', 'ADMIN')")
    public ApiResponse<Boolean> revokeCredential(@PathVariable String id) {
        return new ApiResponse<>(
                true,
                "Credential Revoked Successfully",
                credentialService.revokeCredential(id)
        );
    }

    @GetMapping("/tamper-test/{id}")
    public ApiResponse<Boolean> tamperTest(@PathVariable String id) {

        return new ApiResponse<>(
                true,
                "Tampering Test",
                credentialService.verifyTamperedCredential(id)
        );
    }


}