import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.model";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { JwtModule } from "@nestjs/jwt/dist";

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET }), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports: [UserModule, UserService],
  providers: [UserService, UserResolver],
})
export class UserModule {}
