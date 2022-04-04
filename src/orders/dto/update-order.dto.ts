import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { PaymentMethodEnum } from 'src/common/enums/paymentMethod.enum';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(PaymentMethodEnum)
  @Expose({ name: 'payment_method' })
  paymentMethod: PaymentMethodEnum;

  @IsOptional()
  @IsNumber()
  @Expose({ name: 'total_item_price' })
  totalItemPrice: number;
}