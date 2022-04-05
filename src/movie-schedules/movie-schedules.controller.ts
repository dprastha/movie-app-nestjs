import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { MovieSchedulesService } from './movie-schedules.service';
import { CreateMovieScheduleDto } from './dto/create-movie-schedule.dto';
import { UpdateMovieScheduleDto } from './dto/update-movie-schedule.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';

@Controller('v1/movie-schedules')
@UseGuards(AuthGuard(), RolesGuard)
export class MovieSchedulesController {
  constructor(private readonly movieSchedulesService: MovieSchedulesService) {}

  @Get()
  @Roles(RoleEnum.Admin)
  findAll() {
    return this.movieSchedulesService.findAll();
  }

  @Post()
  @Roles(RoleEnum.Admin)
  create(@Body() createMovieScheduleDto: CreateMovieScheduleDto) {
    return this.movieSchedulesService.create(createMovieScheduleDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieSchedulesService.findOne(id);
  }

  @Put(':id')
  @Roles(RoleEnum.Admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieScheduleDto: UpdateMovieScheduleDto,
  ) {
    return this.movieSchedulesService.update(id, updateMovieScheduleDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieSchedulesService.remove(id);
  }
}
