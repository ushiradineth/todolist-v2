terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

resource "docker_image" "keycloak" {
  name = "quay.io/keycloak/keycloak:21.0.1"
}

resource "docker_container" "keycloak" {
  name  = "keycloak-container"
  image = docker_image.keycloak.image_id

  env = ["KEYCLOAK_ADMIN=${var.KEYCLOAK_ADMIN}", "KEYCLOAK_ADMIN_PASSWORD=${var.KEYCLOAK_ADMIN_PASSWORD}"]

  command = ["start-dev"]

  ports {
    internal = 8080
    external = 8080
  }
}

