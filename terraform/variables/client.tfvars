variable "NEXT_PUBLIC_API_URL" {
  default = "http://server:3000/graphql"
}

variable "API_URL" {
  default = "http://server:3000/graphql"
}

variable "NEXTAUTH_URL" {
  default = "http://localhost:3001"
}

variable "NEXT_PUBLIC_FE" {
  default = "http://localhost:3001"
}

variable "NEXTAUTH_SECRET" {
  default = "cqle0DKxitON4BGZd1i/SxqNck4Zpn/ilhi9qq0ROSE="
}

variable "NEXT_PUBLIC_AUTH_ISSUER" {
  default = "http://keycloak:8080/realms/NestJS-Demo"
}

variable "KEYCLOAK_ID" {
  default = "NestJS"
}

variable "KEYCLOAK_SECRET" {
  default = "Oo6WbRoefES3miixez7kzFK2DSta2RfG"
}

variable "KEYCLOAK_ISSUER" {
  default = "http://keycloak:8080/realms/NestJS-Demo"
}

variable "KEYCLOAK_AUTHORIZATION" {
  default = "http://keycloak:8080/realms/NestJS-Demo/protocol/openid-connect/auth"
}

