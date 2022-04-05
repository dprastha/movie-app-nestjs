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
import { MovieTagsService } from './movie_tags.service';
import { CreateMovieTagDto } from './dto/create-movie_tag.dto';
import { UpdateMovieTagDto } from './dto/update-movie_tag.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';

@Controller('v1/movie-tags')
@UseGuards(AuthGuard(), RolesGuard)
export class MovieTagsController {
  constructor(private readonly movieTagsService: MovieTagsService) {}

  @Get()
  findAll() {
    return this.movieTagsService.findAll();
  }

  @Post()
  @Roles(RoleEnum.Admin)
  create(@Body() createMovieTagDto: CreateMovieTagDto) {
    return this.movieTagsService.create(createMovieTagDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieTagsService.findOne(id);
  }

  @Put(':id')
  @Roles(RoleEnum.Admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieTagDto: UpdateMovieTagDto,
  ) {
    return this.movieTagsService.update(id, updateMovieTagDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieTagsService.remove(id);
  }
}
