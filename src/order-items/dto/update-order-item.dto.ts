import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderItemDto {
  @IsOptional()
  @IsNumber()
  qty: number;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  @Expose({ name: 'sub_total_price' })
  subTotalPrice: number;

  @IsOptional()
  @Expose({ name: 'snap_shot' })
  snapShot: JSON;
}
