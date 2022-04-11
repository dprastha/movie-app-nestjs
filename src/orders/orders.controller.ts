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
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiResponse, IApiResponse } from 'src/common/response/api-response';
import { Order } from './entities/order.entity';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';
import { CustomPaginationMeta } from 'src/common/response/custom-pagination-meta';

@Controller('orders')
@UseGuards(AuthGuard(), RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get()
  @Roles(RoleEnum.Admin)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<IApiResponse<Order>> {
    const orders = await this.ordersService.findAll({
      page,
      limit,
      metaTransformer: (meta: IPaginationMeta): CustomPaginationMeta =>
        new CustomPaginationMeta(
          meta.itemCount,
          meta.totalItems,
          meta.itemsPerPage,
          meta.totalPages,
          meta.currentPage,
        ),
    });

    return await ApiResponse.success(orders, 'Success get all orders');
  }

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<IApiResponse<Order>> {
    const createdOrder = await this.ordersService.create(createOrderDto);

    return await ApiResponse.success(createdOrder, 'Success create order');
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<Order>> {
    const order = await this.ordersService.findOne(+id);

    return await ApiResponse.success(order, 'Success get order');
  }

  @Put(':id')
  @Roles(RoleEnum.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<IApiResponse<Order>> {
    const updatedOrder = await this.ordersService.update(+id, updateOrderDto);

    return await ApiResponse.success(updatedOrder, 'Success update order');
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<Order>> {
    await this.ordersService.remove(+id);

    return await ApiResponse.success(null, 'Success remove order');
  }
}
