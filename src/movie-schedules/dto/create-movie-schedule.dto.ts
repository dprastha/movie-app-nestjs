import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieScheduleDto {
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'start_time' })
  startTime: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'end_time' })
  endTime: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
