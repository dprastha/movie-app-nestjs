import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StudiosService } from './studios.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';

@Controller('v1/studios')
@UseGuards(AuthGuard(), RolesGuard)
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Get()
  findAll() {
    return this.studiosService.findAll();
  }

  @Post()
  @Roles(RoleEnum.Admin)
  create(@Body() createStudioDto: CreateStudioDto) {
    return this.studiosService.create(createStudioDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.studiosService.findOne(+id);
  }

  @Put(':id')
  @Roles(RoleEnum.Admin)
  update(@Param('id') id: number, @Body() updateStudioDto: UpdateStudioDto) {
    return this.studiosService.update(+id, updateStudioDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  remove(@Param('id') id: number) {
    return this.studiosService.remove(+id);
  }
}
