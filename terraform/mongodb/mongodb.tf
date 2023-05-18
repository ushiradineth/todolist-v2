terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

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