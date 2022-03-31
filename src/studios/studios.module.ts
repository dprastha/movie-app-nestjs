import { Module } from '@nestjs/common';
import { StudiosService } from './studios.service';
import { StudiosController } from './studios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiosRepository } from './studios.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudiosRepository])],
  controllers: [StudiosController],
  providers: [StudiosService],
})
export class StudiosModule {}
