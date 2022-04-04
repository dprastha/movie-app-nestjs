import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsRepository } from './order-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemsRepository])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}
