import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.model";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { JwtModule } from "@nestjs/jwt/dist";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET }), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), forwardRef(() => AuthModule)],
  exports: [UserModule, UserService],
  providers: [UserService, UserResolver],
})
export class UserModule {}
