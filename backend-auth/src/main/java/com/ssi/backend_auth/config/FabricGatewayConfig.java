package com.ssi.backend_auth.config;

import io.grpc.ManagedChannel;
import io.grpc.netty.shaded.io.grpc.netty.NettyChannelBuilder;
import io.grpc.netty.shaded.io.grpc.netty.GrpcSslContexts;
import org.hyperledger.fabric.client.identity.X509Identity;


import org.hyperledger.fabric.client.Gateway;
import org.hyperledger.fabric.client.Network;
import org.hyperledger.fabric.client.Contract;
import org.hyperledger.fabric.client.identity.Identities;
import org.hyperledger.fabric.client.identity.Identity;
import org.hyperledger.fabric.client.identity.Signer;
import org.hyperledger.fabric.client.identity.Signers;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Files;
import java.nio.file.Path;

@Configuration
public class FabricGatewayConfig {

    private static final String MSP_ID = "Org1MSP";
    private static final String CHANNEL_NAME = "mychannel";
    private static final String CHAINCODE_NAME = "ssi";

    private static final String PEER_ENDPOINT = "172.17.193.38:7051";
    private static final String PEER_HOSTNAME = "peer0.org1.example.com";

    private static final Path CERT_PATH =
            Path.of("C:/Users/vaibh/fabric-wallet/org1/cert.pem");

    private static final Path PRIVATE_KEY_PATH =
            Path.of("C:/Users/vaibh/fabric-wallet/org1/private-key.pem");

    private static final Path TLS_CERT_PATH =
            Path.of("C:/Users/vaibh/fabric-wallet/org1/tls-ca.crt");

    @Bean
    public Contract fabricContract() throws Exception {

        var certificate = Files.readString(CERT_PATH);
        var privateKey = Files.readString(PRIVATE_KEY_PATH);
        var tlsCertificate = Files.readAllBytes(TLS_CERT_PATH);

        Identity identity = new X509Identity(
                MSP_ID,
                Identities.readX509Certificate(certificate)
        );

        Signer signer = Signers.newPrivateKeySigner(
                Identities.readPrivateKey(privateKey)
        );

        ManagedChannel channel = NettyChannelBuilder
                .forTarget(PEER_ENDPOINT)
                .sslContext(
                        GrpcSslContexts.forClient()
                                .trustManager(TLS_CERT_PATH.toFile())
                                .build()
                )
                .overrideAuthority(PEER_HOSTNAME)
                .build();

        Gateway gateway = Gateway.newInstance()
                .identity(identity)
                .signer(signer)
                .connection(channel)
                .connect();

        Network network = gateway.getNetwork(CHANNEL_NAME);

        return network.getContract(CHAINCODE_NAME);
    }
}