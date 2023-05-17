variable "MONGO_INITDB_ROOT_USERNAME" {
  type = string
}

variable "MONGO_INITDB_ROOT_PASSWORD" {
  type      = string
  sensitive = true
}

variable "KEYCLOAK_ADMIN" {
  type = string
}

variable "KEYCLOAK_ADMIN_PASSWORD" {
  type      = string
  sensitive = true
}

variable "KEYCLOAK_CLIENT_SECRET" {
  type      = string
  sensitive = true
}

variable "KEYCLOAK_SERVER_SECRET" {
  type      = string
  sensitive = true
}

variable "KEYCLOAK_REALM" {
  type = string
}

variable "KEYCLOAK_CLIENT_CLIENT_ID" {
  type = string
}

variable "KEYCLOAK_SERVER_CLIENT_ID" {
  type = string
}
