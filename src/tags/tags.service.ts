import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsRepository)
    private readonly tagRepository: TagsRepository,
  ) {}
  async findAll(options: IPaginationOptions): Promise<Pagination<Tag>> {
    const tags = await this.tagRepository.getTags();

    return paginate<Tag>(tags, options);
  }

  create(createTagDto: CreateTagDto): Promise<Tag> {
    const { name } = createTagDto;
    const tag = this.tagRepository.create({
      name,
    });

    return this.tagRepository.save(tag);
  }

  async findOne(id: number): Promise<Tag> {
    const found = this.tagRepository.findOne(id, {
      relations: ['movieTags'],
    });

    if (!found) {
      throw new NotFoundException(`Tag with ID "${id}" not found`);
    }

    return found;
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    const { name } = updateTagDto;
    const tag = await this.findOne(id);

    if (!tag) {
      throw new NotFoundException(`Tag with ID "${id}" not found`);
    }

    tag.name = name;

    await this.tagRepository.save(tag);
    return tag;
  }

  async remove(id: number): Promise<void> {
    const result = await this.tagRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
