import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsRepository } from './tags.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TagsRepository]), AuthModule],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
