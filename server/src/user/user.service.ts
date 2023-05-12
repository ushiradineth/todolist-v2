import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.model";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  private readonly logger = new Logger(UserService.name);

  Users(): Promise<User[]> {
    this.logger.log("Got All Users");
    return this.userModel.find().exec();
  }

  async User(user: AuthenticatedUser): Promise<User> {
    try {
      const existingUser: User = await this.userModel.findOne({ userId: user.sub }).exec();

      if (existingUser) {
        this.logger.log("Found existing user: " + existingUser._id);
        return existingUser;
      }

      const newUser = new this.userModel(user);
      newUser.userId = user.sub;

      newUser.save();

      this.logger.log("Created new user: " + newUser._id);
    } catch (error) {
      this.logger.error(error.toString());
    }
  }
}
