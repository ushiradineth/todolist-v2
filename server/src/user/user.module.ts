import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { User, UserSchema } from "./user.model";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports: [UserModule],
  providers: [UserService, UserResolver],
  controllers: [UserController],
})
export class UserModule {}
