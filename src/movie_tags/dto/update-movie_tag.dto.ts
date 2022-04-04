import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateMovieTagDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  tag: string;
}
