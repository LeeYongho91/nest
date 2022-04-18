import { IsNotEmpty, IsString } from 'class-validator';

export class createBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
