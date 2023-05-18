output "KEYCLOAK_EXTERNAL_PORT" {
  value = docker_container.keycloak.ports[0].external
}

output "KEYCLOAK_INTERNAL_PORT" {
  value = docker_container.keycloak.ports[0].internal
}
