import { Expose } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMovieScheduleDto {
  @IsOptional()
  @IsString()
  @Expose({ name: 'start_time' })
  startTime: string;

  @IsOptional()
  @IsString()
  @Expose({ name: 'end_time' })
  endTime: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsDateString()
  date: Date;
}
