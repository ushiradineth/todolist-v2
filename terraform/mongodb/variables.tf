variable "MONGO_INITDB_ROOT_USERNAME" {
  type = string
}

variable "MONGO_INITDB_ROOT_PASSWORD" {
  type      = string
  sensitive = true
}