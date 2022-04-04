import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMovieTagDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  tag: string;
}
