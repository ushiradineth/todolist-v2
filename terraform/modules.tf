module "client" {
  source                    = "./client"
  KEYCLOAK_CLIENT_SECRET    = var.KEYCLOAK_CLIENT_SECRET
  KEYCLOAK_REALM            = var.KEYCLOAK_REALM
  KEYCLOAK_CLIENT_CLIENT_ID = var.KEYCLOAK_CLIENT_CLIENT_ID
  KEYCLOAK_EXTERNAL_PORT    = module.keycloak.KEYCLOAK_EXTERNAL_PORT
}

module "server" {
  source                    = "./server"
  KEYCLOAK_SERVER_SECRET    = var.KEYCLOAK_SERVER_SECRET
  KEYCLOAK_REALM            = var.KEYCLOAK_REALM
  KEYCLOAK_SERVER_CLIENT_ID = var.KEYCLOAK_SERVER_CLIENT_ID
  KEYCLOAK_EXTERNAL_PORT    = module.keycloak.KEYCLOAK_EXTERNAL_PORT
}

module "mongodb" {
  source                     = "./mongodb"
  MONGO_INITDB_ROOT_USERNAME = var.MONGO_INITDB_ROOT_USERNAME
  MONGO_INITDB_ROOT_PASSWORD = var.MONGO_INITDB_ROOT_PASSWORD
}

module "keycloak" {
  source                  = "./keycloak"
  KEYCLOAK_ADMIN          = var.KEYCLOAK_ADMIN
  KEYCLOAK_ADMIN_PASSWORD = var.KEYCLOAK_ADMIN_PASSWORD
}
