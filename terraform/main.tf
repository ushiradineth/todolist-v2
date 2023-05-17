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

  depends_on = [docker_container.mongodb, module.keycloak]
  env        = ["KEYCLOAK_SECRET=${var.KEYCLOAK_SERVER_SECRET}", "KEYCLOAK_URL=http://host.docker.internal:${module.keycloak.KEYCLOAK_EXTERNAL_PORT}", "KEYCLOAK_REALM=${var.KEYCLOAK_REALM}", "KEYCLOAK_CLIENT_ID=${var.KEYCLOAK_SERVER_CLIENT_ID}"]

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

  env = ["KEYCLOAK_SECRET=${var.KEYCLOAK_CLIENT_SECRET}", "NEXT_PUBLIC_KEYCLOAK_SECRET=${var.KEYCLOAK_CLIENT_SECRET}", "KEYCLOAK_ISSUER=http://host.docker.internal:${module.keycloak.KEYCLOAK_EXTERNAL_PORT}/realms/${var.KEYCLOAK_REALM}", "NEXT_PUBLIC_AUTH_ISSUER=http://host.docker.internal:${module.keycloak.KEYCLOAK_EXTERNAL_PORT}/realms/${var.KEYCLOAK_REALM}", "KEYCLOAK_ID=${var.KEYCLOAK_CLIENT_CLIENT_ID}", "NEXT_PUBLIC_KEYCLOAK_ID=${var.KEYCLOAK_CLIENT_CLIENT_ID}"]

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

  env = ["MONGO_INITDB_ROOT_USERNAME=${var.MONGO_INITDB_ROOT_USERNAME}", "MONGO_INITDB_ROOT_PASSWORD=${var.MONGO_INITDB_ROOT_PASSWORD}"]

  ports {
    internal = 27017
    external = 27017
  }
}

module "keycloak" {
  source                  = "./modules/keycloak"
  KEYCLOAK_ADMIN          = var.KEYCLOAK_ADMIN
  KEYCLOAK_ADMIN_PASSWORD = var.KEYCLOAK_ADMIN_PASSWORD
}
