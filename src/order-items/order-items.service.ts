import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemsRepository } from './order-item.repository';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItemsRepository)
    private readonly orderItemsRepository: OrderItemsRepository,
  ) {}

  async findAll(options: IPaginationOptions): Promise<Pagination<OrderItem>> {
    const orderItems = await this.orderItemsRepository.getOrderItems();

    return paginate<OrderItem>(orderItems, options);
  }

  create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    return this.orderItemsRepository.createOrderItem(createOrderItemDto);
  }

  async findOne(id: number): Promise<OrderItem> {
    const found = await this.orderItemsRepository.findOne(id, {
      relations: ['order', 'movieSchedule'],
    });

    if (!found) {
      throw new NotFoundException('OrderItem not found');
    }

    return found;
  }

  async update(
    id: number,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    const { qty, price, subTotalPrice, snapShot } = updateOrderItemDto;
    const orderItem = await this.findOne(id);

    orderItem.qty = qty;
    orderItem.price = price;
    orderItem.subTotalPrice = subTotalPrice;
    orderItem.snapShot = snapShot;

    await this.orderItemsRepository.save(orderItem);
    return orderItem;
  }

  async remove(id: number): Promise<void> {
    const result = await this.orderItemsRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException('OrderItem not found');
    }
  }
}
