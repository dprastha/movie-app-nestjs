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
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { ApiResponse, IApiResponse } from 'src/common/response/api-response';
import { Tag } from './entities/tag.entity';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';
import { CustomPaginationMeta } from 'src/common/response/custom-pagination-meta';

@Controller('tags')
@UseGuards(AuthGuard(), RolesGuard)
export class TagsController {
  constructor(private tagsService: TagsService) {}
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<IApiResponse<Tag>> {
    const tags = await this.tagsService.findAll({
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

    return await ApiResponse.success(tags, 'Success get all tags');
  }

  @Post()
  @Roles(RoleEnum.Admin)
  async create(@Body() createTagDto: CreateTagDto): Promise<IApiResponse<Tag>> {
    const createdTag = await this.tagsService.create(createTagDto);

    return await ApiResponse.success(createdTag, 'Success create tag');
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<Tag>> {
    const tag = await this.tagsService.findOne(id);

    return await ApiResponse.success(tag, 'Success get tag');
  }

  @Put(':id')
  @Roles(RoleEnum.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<IApiResponse<Tag>> {
    const updatedTag = await this.tagsService.update(id, updateTagDto);

    return await ApiResponse.success(updatedTag, 'Success update tag');
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<null>> {
    await this.tagsService.remove(id);

    return await ApiResponse.success(null, 'Success delete tag');
  }
}
