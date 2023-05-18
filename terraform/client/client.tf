terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

resource "docker_image" "client" {
  name = "nestjs-client:latest"
}

resource "docker_container" "client" {
  name  = "client-container"
  image = docker_image.client.image_id

  env = ["KEYCLOAK_SECRET=${var.KEYCLOAK_CLIENT_SECRET}", "NEXT_PUBLIC_KEYCLOAK_SECRET=${var.KEYCLOAK_CLIENT_SECRET}", "KEYCLOAK_ISSUER=http://host.docker.internal:${var.KEYCLOAK_EXTERNAL_PORT}/realms/${var.KEYCLOAK_REALM}", "NEXT_PUBLIC_AUTH_ISSUER=http://host.docker.internal:${var.KEYCLOAK_EXTERNAL_PORT}/realms/${var.KEYCLOAK_REALM}", "KEYCLOAK_ID=${var.KEYCLOAK_CLIENT_CLIENT_ID}", "NEXT_PUBLIC_KEYCLOAK_ID=${var.KEYCLOAK_CLIENT_CLIENT_ID}"]

  ports {
    internal = 3001
    external = 3001
  }
}