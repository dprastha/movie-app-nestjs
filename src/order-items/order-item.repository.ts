import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@EntityRepository(OrderItem)
export class OrderItemsRepository extends Repository<OrderItem> {
  async getOrderItems(): Promise<SelectQueryBuilder<OrderItem>> {
    const queryBuilder = this.createQueryBuilder('orderItem')
      .leftJoinAndSelect('orderItem.order', 'order')
      .leftJoinAndSelect('orderItem.movieSchedule', 'movieSchedule');

    return queryBuilder;
  }

  async createOrderItem(
    createOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItem> {
    const { order, movieSchedule, qty, price, subTotalPrice, snapShot } =
      createOrderItemDto;

    const orderItem = this.create({
      order,
      movieSchedule,
      qty,
      price,
      subTotalPrice,
      snapShot,
    });

    await this.save(orderItem);
    return orderItem;
  }
}
