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

  env = ["MONGO_INITDB_ROOT_USERNAME=${var.TF_VARS_MONGO_INITDB_ROOT_USERNAME}", "MONGO_INITDB_ROOT_PASSWORD=${var.TF_VARS_MONGO_INITDB_ROOT_PASSWORD}"]

  ports {
    internal = 27017
    external = 27017
  }
}

module "keycloak" {
  source = "./modules/keycloak"
  TF_VARS_KEYCLOAK_ADMIN=var.TF_VARS_KEYCLOAK_ADMIN
  TF_VARS_KEYCLOAK_ADMIN_PASSWORD=var.TF_VARS_KEYCLOAK_ADMIN_PASSWORD
}