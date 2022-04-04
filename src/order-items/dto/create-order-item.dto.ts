import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'sub_total_price' })
  subTotalPrice: number;

  @IsNotEmpty()
  @Expose({ name: 'snap_shot' })
  snapShot: JSON;
}
