import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthUserDto } from "./dto/auth-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./user.model";
import * as bcrypt from "bcrypt";

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
    this.logger.log("Got user id: " + res._id);
    return res;
  }

  async UserByEmail(email: string): Promise<User> {
    const res: User = await this.userModel.findOne({ email });
    this.logger.log("Got user email: " + res.email);
    return res;
  }

  async Authenticate(authUserDto: AuthUserDto): Promise<User | null> {
    const user: User = await this.userModel.findOne({ email: authUserDto.email });
    const result = await bcrypt.compare(authUserDto.password, user.password);

    if (result) {
      this.logger.log("Authenticated user: " + user.email);
      return user;
    } else {
      return null;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User | Error> {
    try {
      const doesUserExist = await this.userModel.findOne({ email: createUserDto.email });

      if (doesUserExist) {
        return {
          name: "User exists",
          message: "User already exists",
        } as Error;
      } else {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(createUserDto.password, salt);
        createUserDto.password = hash;
        const createdUser = new this.userModel(createUserDto);

        this.logger.log("Created user id: " + createdUser._id);
        return createdUser.save();
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(updateUserDto.password, salt);
      updateUserDto.password = hash;
    }

    const updatedUser = await this.userModel.findOneAndUpdate({ _id: updateUserDto.id }, updateUserDto);
    this.logger.log("Updated user id: " + updatedUser._id);
    return updatedUser;
  }

  async deleteUser(deleteUserDto: DeleteUserDto): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete({
      _id: deleteUserDto.id,
    });
    this.logger.log("Deleted user id: " + deletedUser._id);
    return deletedUser;
  }
}
