import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

export class OrderItemsRepository extends Repository<OrderItem> {
  async getOrderItems(): Promise<OrderItem[]> {
    // const query = this.createQueryBuilder('orderItem').leftJoinAndSelect(
    //   'orderItem.order',
    //   'order',
    // );

    // const orderItems = await query.getMany();
    // return orderItems;

    return this.find();
  }

  async createOrderItem(
    createOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItem> {
    const { qty, price, subTotalPrice, snapShot } = createOrderItemDto;

    const orderItem = this.create({
      qty,
      price,
      subTotalPrice,
      snapShot,
    });

    await this.save(orderItem);
    return orderItem;
  }
}
