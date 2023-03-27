import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthUserDto } from "./dto/auth-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./user.model";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly jwtService: JwtService) {}
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

      if (doesUserExist) throw new Error("User already exists");
      else {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(createUserDto.password, salt);
        createUserDto.password = hash;
        const createdUser = await new this.userModel(createUserDto).save();

        this.logger.log("Created user id: " + createdUser._id);
        return createdUser;
      }
    } catch (error) {
      throw new BadRequestException("User not created");
    }
  }

  async updateUser(updateUserDto: UpdateUserDto, token: string): Promise<User> {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(updateUserDto.password, salt);
      updateUserDto.password = hash;
    }

    const jwt: JWT = this.jwtService.decode(token.split(" ")[1]) as JWT;
    const user = await this.userModel.findByIdAndUpdate({ _id: jwt.sub }, updateUserDto);
    if (user) {
      this.logger.log("Updated user id: " + user._id);
      return user;
    } else {
      throw new BadRequestException("User does not exist");
    }
  }

  async deleteUser(token: string): Promise<User> {
    const jwt: JWT = this.jwtService.decode(token.split(" ")[1]) as JWT;
    const user = await this.userModel.findByIdAndDelete({ _id: jwt.sub });
    if (user) {
      this.logger.log("Deleted user id: " + user._id);
      return user;
    } else {
      throw new BadRequestException("User does not exist");
    }
  }

  async linkTodo(userID: string, todoID: string): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate({ _id: userID }, { $push: { Todos: todoID } });
    this.logger.log(`Linked todo ${todoID} to user ${userID}`);
    return updatedUser;
  }

  async unlinkTodo(userID: string, todoID: string): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate({ _id: userID }, { $pull: { Todos: todoID } });
    this.logger.log(`Unlinked todo ${todoID} from user ${userID}`);
    return updatedUser;
  }
}
