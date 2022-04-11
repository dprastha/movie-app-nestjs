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
import { MovieTagsService } from './movie_tags.service';
import { CreateMovieTagDto } from './dto/create-movie_tag.dto';
import { UpdateMovieTagDto } from './dto/update-movie_tag.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { ApiResponse, IApiResponse } from 'src/common/response/api-response';
import { MovieTag } from './entities/movie_tag.entity';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';
import { CustomPaginationMeta } from 'src/common/response/custom-pagination-meta';

@Controller('movie-tags')
@UseGuards(AuthGuard(), RolesGuard)
export class MovieTagsController {
  constructor(private readonly movieTagsService: MovieTagsService) {}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<IApiResponse<MovieTag>> {
    const movieTags = await this.movieTagsService.findAll({
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

    return await ApiResponse.success(movieTags, 'Success get all movieTags');
  }

  @Post()
  @Roles(RoleEnum.Admin)
  async create(
    @Body() createMovieTagDto: CreateMovieTagDto,
  ): Promise<IApiResponse<MovieTag>> {
    const createdMovieTag = await this.movieTagsService.create(
      createMovieTagDto,
    );

    return await ApiResponse.success(
      createdMovieTag,
      'Success create movieTag',
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<MovieTag>> {
    const movieTag = await this.movieTagsService.findOne(id);

    return await ApiResponse.success(movieTag, 'Success get movieTag');
  }

  @Put(':id')
  @Roles(RoleEnum.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieTagDto: UpdateMovieTagDto,
  ): Promise<IApiResponse<MovieTag>> {
    const updatedMovieTag = await this.movieTagsService.update(
      id,
      updateMovieTagDto,
    );

    return await ApiResponse.success(
      updatedMovieTag,
      'Success update movieTag',
    );
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<null>> {
    await this.movieTagsService.remove(id);

    return await ApiResponse.success(null, 'Success remove movieTag');
  }
}
