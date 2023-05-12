import { Injectable } from "@nestjs/common";
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, TokenValidation } from "nest-keycloak-connect";

@Injectable()
export class KeycloakService implements KeycloakConnectOptionsFactory {
  url: string;
  realm: string;
  clientId: string;
  secret: string;

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: process.env.KEYCLOAK_URL,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: process.env.KEYCLOAK_SECRET,
      tokenValidation: TokenValidation.OFFLINE,
    };
  }
}
