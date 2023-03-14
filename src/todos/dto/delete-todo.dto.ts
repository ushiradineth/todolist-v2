import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTodoDto {
  @IsString()
  @IsNotEmpty()
  public id: string;
}
