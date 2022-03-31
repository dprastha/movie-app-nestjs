import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudioDto {
  @IsNotEmpty()
  @IsNumber()
  studio_number: number;

  @IsNotEmpty()
  @IsNumber()
  seat_capacity: number;
}
