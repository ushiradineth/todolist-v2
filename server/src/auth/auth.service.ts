import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthUserDto } from "src/user/dto/auth-user.dto";
import { User } from "src/user/user.model";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { Logger } from "@nestjs/common/services";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}
  private readonly logger = new Logger(UserService.name);

  async Authenticate(authUserDto: AuthUserDto): Promise<User | null> {
    const user = await this.userService.UserByEmail(authUserDto.email);
    const result = await bcrypt.compare(authUserDto.password, user.password);

    if (result) {
      this.logger.log("Authenticated user: " + user.email);
      return user;
    } else {
      return null;
    }
  }
}
