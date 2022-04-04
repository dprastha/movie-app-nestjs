import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async getOrders(): Promise<Order[]> {
    const query = this.createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItem');

    const orders = await query.getMany();
    return orders;
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
