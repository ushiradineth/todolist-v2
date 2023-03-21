import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./user.model";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  private readonly logger = new Logger(UserService.name);

  Users(): Promise<User[]> {
    this.logger.log("Got All Users");
    return this.userModel.find().exec();
  }

  async User(id: string): Promise<User> {
    const res: User = await this.userModel.findById(id);
    this.logger.log("Got user id:" + res._id);
    return res;
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    this.logger.log("Created user id:" + createdUser._id);
    return createdUser.save();
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate({ _id: updateUserDto.id }, updateUserDto);
    this.logger.log("Updated user id:" + updatedUser._id);
    return updatedUser;
  }

  async deleteUser(deleteUserDto: DeleteUserDto): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete({
      _id: deleteUserDto.id,
    });
    this.logger.log("Deleted user id:" + deletedUser._id);
    return deletedUser;
  }
}
