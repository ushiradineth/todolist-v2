import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public todo: string;
}
