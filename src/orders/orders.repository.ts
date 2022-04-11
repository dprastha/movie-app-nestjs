import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async getOrders(): Promise<SelectQueryBuilder<Order>> {
    const queryBuilder = this.createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItem');

    return queryBuilder;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { user, paymentMethod, totalItemPrice } = createOrderDto;
    const order = this.create({
      user,
      paymentMethod,
      totalItemPrice,
    });

    await this.save(order);
    return order;
  }
}
