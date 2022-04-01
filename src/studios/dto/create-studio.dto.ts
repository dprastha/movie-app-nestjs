import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudioDto {
  @Expose({ name: 'studio_number' })
  @IsNotEmpty()
  @IsNumber()
  studioNumber: number;

  @Expose({ name: 'seat_capacity' })
  @IsNotEmpty()
  @IsNumber()
  seatCapacity: number;
}
