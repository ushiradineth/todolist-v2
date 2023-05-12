import { Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { AuthenticatedUser } from "nest-keycloak-connect";

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { name: "User" })
  User(@AuthenticatedUser() user: AuthenticatedUser) {
    return this.userService.User(user);
  }

  @Query(() => [User], { name: "Users" })
  Users() {
    return this.userService.Users();
  }
}
