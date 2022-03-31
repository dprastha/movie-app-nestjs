import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StudiosService } from './studios.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';

@Controller('v1/studios')
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Get()
  findAll() {
    return this.studiosService.findAll();
  }

  @Post()
  create(@Body() createStudioDto: CreateStudioDto) {
    return this.studiosService.create(createStudioDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.studiosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateStudioDto: UpdateStudioDto) {
    return this.studiosService.update(+id, updateStudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.studiosService.remove(+id);
  }
}
