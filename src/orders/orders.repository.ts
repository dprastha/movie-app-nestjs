import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async getOrders(): Promise<Order[]> {
    return await this.find();
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { paymentMethod, totalItemPrice } = createOrderDto;
    const order = this.create({
      paymentMethod,
      totalItemPrice,
    });

    await this.save(order);
    return order;
  }
}
