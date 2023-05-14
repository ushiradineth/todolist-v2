terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

// NestJS BE
resource "docker_image" "server" {
  name = "nestjs-server:latest"
}

resource "docker_container" "server" {
  name  = "server-container"
  image = docker_image.server.image_id

  depends_on = [docker_container.mongodb, docker_container.keycloak]

  ports {
    internal = 3000
    external = 3000
  }
}

// NextJS FE
resource "docker_image" "client" {
  name = "nestjs-client:latest"
}

resource "docker_container" "client" {
  name  = "client-container"
  image = docker_image.client.image_id

  depends_on = [docker_container.server]

  ports {
    internal = 3001
    external = 3001
  }
}

// Mongodb
resource "docker_image" "mongodb" {
  name = "mongo:latest"
}

resource "docker_container" "mongodb" {
  name  = "mongodb-container"
  image = docker_image.mongodb.image_id

  env = ["MONGO_INITDB_ROOT_USERNAME=ushira", "MONGO_INITDB_ROOT_PASSWORD=ushira"]

  ports {
    internal = 27017
    external = 27017
  }
}

// Keycloak
resource "docker_image" "keycloak" {
  name = "quay.io/keycloak/keycloak:21.0.1"
}

resource "docker_container" "keycloak" {
  name  = "keycloak-container"
  image = docker_image.keycloak.image_id

  env = ["KEYCLOAK_ADMIN=admin", "KEYCLOAK_ADMIN_PASSWORD=admin"]

  command = ["start-dev"]

  ports {
    internal = 8080
    external = 8080
  }
}
