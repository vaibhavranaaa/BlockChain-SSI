package com.ssi.backend_auth.controller;

import org.hyperledger.fabric.client.Contract;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FabricVerifyController {

    private final Contract fabricContract;

    public FabricVerifyController(Contract fabricContract) {
        this.fabricContract = fabricContract;
    }

    @GetMapping("/api/fabric/credential/verify/{id}")
    public String verifyCredential(
            @PathVariable String id,
            @RequestParam String hash) {

        try {
            byte[] result = fabricContract.evaluateTransaction(
                    "VerifyCredential",
                    id,
                    hash
            );

            return new String(result);
        } catch (Exception e) {
            return "Fabric error: " + e.getMessage();
        }
    }
}