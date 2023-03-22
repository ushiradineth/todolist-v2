import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class AuthUserDto {
  @ApiProperty({ description: "Email of the user" })
  @IsString()
  @IsNotEmpty()
  @Field()
  public email: string;

  @ApiProperty({ description: "Password of the user" })
  @IsString()
  @IsNotEmpty()
  @Field()
  public password: string;
}
