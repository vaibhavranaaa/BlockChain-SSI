package com.ssi.backend_auth.controller;


import org.hyperledger.fabric.client.Contract;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FabricTestController {

    private final Contract fabricContract;

    public FabricTestController(Contract fabricContract) {
        this.fabricContract = fabricContract;
    }

    @GetMapping("/api/fabric/test")
    public String testFabric() {
        try {
            byte[] result = fabricContract
                    .evaluateTransaction("CredentialExists", "cred001");

            return new String(result);
        } catch (Exception e) {
            return "Fabric error: " + e.getMessage();
        }
    }

    @GetMapping("/api/fabric/credential/{id}")
    public String getCredential(@PathVariable String id) {
        try {
            byte[] result = fabricContract
                    .evaluateTransaction("GetCredential", id);

            return new String(result);
        } catch (Exception e) {
            return "Fabric error: " + e.getMessage();
        }
    }
}