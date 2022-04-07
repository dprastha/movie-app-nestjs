import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiResponse, IApiResponse } from 'src/common/response/api-response';
import { OrderItem } from './entities/order-item.entity';

@Controller('order-items')
@UseGuards(AuthGuard(), RolesGuard)
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Get()
  @Roles(RoleEnum.Admin)
  async findAll(): Promise<IApiResponse<OrderItem[]>> {
    const orderItems = await this.orderItemsService.findAll();

    return await ApiResponse.success(orderItems, 'Success get all orderItems');
  }

  @Post()
  async create(
    @Body() createOrderItemDto: CreateOrderItemDto,
  ): Promise<IApiResponse<OrderItem>> {
    const createdOrderItem = await this.orderItemsService.create(
      createOrderItemDto,
    );

    return await ApiResponse.success(
      createdOrderItem,
      'Success create orderItem',
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<OrderItem>> {
    const orderItem = await this.orderItemsService.findOne(+id);

    return await ApiResponse.success(orderItem, 'Success get orderItem');
  }

  @Put(':id')
  @Roles(RoleEnum.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<IApiResponse<OrderItem>> {
    const updatedOrderItem = await this.orderItemsService.update(
      +id,
      updateOrderItemDto,
    );

    return await ApiResponse.success(
      updatedOrderItem,
      'Success update orderItem',
    );
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<null>> {
    await this.orderItemsService.remove(+id);

    return await ApiResponse.success(null, 'Success remove orderItem');
  }
}
