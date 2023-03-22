import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

@InputType()
export class UpdateUserDto {
  @ApiProperty({ description: "ID of the user" })
  @IsString()
  @IsNotEmpty()
  @Field()
  public id: string;

  @ApiProperty({ description: "Email of the user" })
  @ValidateIf((object, value) => value !== null)
  @Field({ nullable: true })
  public email: string | null;

  @ApiProperty({ description: "Name of the user" })
  @ValidateIf((object, value) => value !== null)
  @Field({ nullable: true })
  public name: string | null;

  @ApiProperty({ description: "Password of the user" })
  @ValidateIf((object, value) => value !== null)
  @Field({ nullable: true })
  public password: string | null;
}
