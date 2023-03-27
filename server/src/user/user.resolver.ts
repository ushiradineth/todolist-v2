import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthUserDto } from "./dto/auth-user.dto";
import { UseGuards } from "@nestjs/common/decorators";
import { GqlAuthGuard } from "src/user.guard";

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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, { name: "DeleteUser" })
  deleteUser(@Context("req") req) {
    return this.userService.deleteUser(req.headers.authorization);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, { name: "UpdateUser" })
  updateUser(@Args("UserInput") User: UpdateUserDto, @Context("req") req) {
    return this.userService.updateUser(User, req.headers.authorization);
  }
}
