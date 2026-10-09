package com.ssi.backend_auth.controller;

import com.ssi.backend_auth.service.WalletSignatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WalletTestController {

    private final WalletSignatureService walletSignatureService;

    @GetMapping("/api/wallet/sign")
    public String sign(
            @RequestParam String did,
            @RequestParam String data) {

        return walletSignatureService.sign(did, data);
    }

    @GetMapping("/api/wallet/verify")
    public boolean verify(
            @RequestParam String did,
            @RequestParam String data,
            @RequestParam String signature) {

        return walletSignatureService.verify(did, data, signature);
    }
}