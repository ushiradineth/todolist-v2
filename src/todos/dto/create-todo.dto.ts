import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
@InputType()
export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  public todo: string;
}
