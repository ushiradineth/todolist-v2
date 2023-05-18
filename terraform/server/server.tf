terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

resource "docker_image" "server" {
  name = "nestjs-server:latest"
}

resource "docker_container" "server" {
  name  = "server-container"
  image = docker_image.server.image_id

  env        = ["KEYCLOAK_SECRET=${var.KEYCLOAK_SERVER_SECRET}", "KEYCLOAK_URL=http://host.docker.internal:${var.KEYCLOAK_EXTERNAL_PORT}", "KEYCLOAK_REALM=${var.KEYCLOAK_REALM}", "KEYCLOAK_CLIENT_ID=${var.KEYCLOAK_SERVER_CLIENT_ID}"]

  ports {
    internal = 3000
    external = 3000
  }
} 