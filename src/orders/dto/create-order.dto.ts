import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { PaymentMethodEnum } from 'src/common/enums/paymentMethod.enum';

export class CreateOrderDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  @IsEnum(PaymentMethodEnum)
  @Expose({ name: 'payment_method' })
  paymentMethod: PaymentMethodEnum;

  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'total_item_price' })
  totalItemPrice: number;
}
