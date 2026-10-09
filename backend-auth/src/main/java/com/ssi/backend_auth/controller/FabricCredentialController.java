package com.ssi.backend_auth.controller;

import org.hyperledger.fabric.client.Contract;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FabricCredentialController {

    private final Contract fabricContract;

    public FabricCredentialController(Contract fabricContract) {
        this.fabricContract = fabricContract;
    }

    @PostMapping("/api/fabric/credential/issue")
    public String issueCredential() {
        try {
            byte[] result = fabricContract.submitTransaction(
                    "IssueCredential",
                    "cred002",
                    "did:example:holder456",
                    "did:example:university",
                    "StudentCredential",
                    "xyz789hash",
                    "2026-09-11",
                    "2027-09-11"
            );

            return new String(result);
        } catch (Exception e) {
            return "Fabric error: " + e.getMessage();
        }
    }
}