import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/user.model";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [forwardRef(() => UserModule), JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: "60s" } }), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports: [AuthService],
})
export class AuthModule {}
