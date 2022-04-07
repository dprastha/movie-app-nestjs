import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { StudiosService } from './studios.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { ApiResponse, IApiResponse } from 'src/common/response/api-response';
import { Studio } from './entities/studio.entity';

@Controller('studios')
@UseGuards(AuthGuard(), RolesGuard)
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Get()
  async findAll(): Promise<IApiResponse<Studio[]>> {
    const studios = await this.studiosService.findAll();

    return await ApiResponse.success(studios, 'Success get all studios');
  }

  @Post()
  @Roles(RoleEnum.Admin)
  async create(
    @Body() createStudioDto: CreateStudioDto,
  ): Promise<IApiResponse<Studio>> {
    const createdOrder = await this.studiosService.create(createStudioDto);

    return await ApiResponse.success(createdOrder, 'Success create studio');
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<Studio>> {
    const studio = await this.studiosService.findOne(id);

    return await ApiResponse.success(studio, 'Success get studio');
  }

  @Put(':id')
  @Roles(RoleEnum.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudioDto: UpdateStudioDto,
  ): Promise<IApiResponse<Studio>> {
    const updatedStudio = await this.studiosService.update(id, updateStudioDto);

    return await ApiResponse.success(updatedStudio, 'Success update studio');
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<null>> {
    await this.studiosService.remove(id);

    return await ApiResponse.success(null, 'Success remove studio');
  }
}
