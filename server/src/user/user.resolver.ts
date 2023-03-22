import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthUserDto } from "./dto/auth-user.dto";

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User], { name: "Users" })
  Users() {
    return this.userService.Users();
  }

  @Query(() => User, { name: "User" })
  User(@Args("UserInput") id: string) {
    return this.userService.User(id);
  }

  @Query(() => User, { name: "UserByEmail" })
  UserByEmail(@Args("UserInput") email: string) {
    return this.userService.UserByEmail(email);
  }

  @Query(() => User, { name: "UserAuthentication" })
  Authenticate(@Args("UserInput") User: AuthUserDto) {
    return this.userService.Authenticate(User);
  }

  @Mutation(() => User, { name: "CreateUser" })
  createUser(@Args("UserInput") User: CreateUserDto) {
    return this.userService.createUser(User);
  }

  @Mutation(() => User, { name: "DeleteUser" })
  deleteUser(@Args("UserInput") User: DeleteUserDto) {
    return this.userService.deleteUser(User);
  }

  @Mutation(() => User, { name: "UpdateUser" })
  updateUser(@Args("UserInput") User: UpdateUserDto) {
    return this.userService.updateUser(User);
  }
}
