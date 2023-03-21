import { Body, Controller, Get, Post, Delete, Put, Param } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Controller("User")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  Users(): Promise<User[]> {
    return this.userService.Users();
  }

  @Get(":id")
  User(@Param("id") id: string): Promise<User> {
    return this.userService.User(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Delete()
  async delete(@Body() deleteUserDto: DeleteUserDto) {
    return await this.userService.deleteUser(deleteUserDto);
  }

  @Put()
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(updateUserDto);
  }
}
