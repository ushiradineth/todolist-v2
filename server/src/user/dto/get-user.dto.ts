import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class GetUserDto {
  @ApiProperty({ description: "ID of the user" })
  @IsString()
  @IsNotEmpty()
  @Field()
  public id: string;
}
