import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { PaymentMethodEnum } from 'src/common/enums/paymentMethod.enum';
import { User } from 'src/users/entities/user.entity';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  @Expose({ name: 'user_id' })
  user: User;

  @IsOptional()
  @IsEnum(PaymentMethodEnum)
  @Expose({ name: 'payment_method' })
  paymentMethod: PaymentMethodEnum;

  @IsOptional()
  @IsNumber()
  @Expose({ name: 'total_item_price' })
  totalItemPrice: number;
}
