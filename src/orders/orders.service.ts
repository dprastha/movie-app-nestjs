import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { MailService } from 'src/mail/mail.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
    private mailService: MailService,
  ) {}

  async findAll(options: IPaginationOptions): Promise<Pagination<Order>> {
    const orders = await this.ordersRepository.getOrders();

    return paginate<Order>(orders, options);
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.ordersRepository.createOrder(createOrderDto);
    const orderWithRelation = await this.ordersRepository.findOne(order.id, {
      relations: ['user', 'orderItems'],
    });
    this.mailService.sendTransactionReceipt(orderWithRelation);

    return orderWithRelation;
  }

  async findOne(id: number): Promise<Order> {
    const found = await this.ordersRepository.findOne(id, {
      relations: ['user', 'orderItems'],
    });

    if (!found) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }

    return found;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { user, paymentMethod, totalItemPrice } = updateOrderDto;
    const order = await this.findOne(id);

    order.user = user;
    order.paymentMethod = paymentMethod;
    order.totalItemPrice = totalItemPrice;

    await this.ordersRepository.save(order);
    return order;
  }

  async remove(id: number): Promise<void> {
    const result = await this.ordersRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
