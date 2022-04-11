import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {
  async getTags(): Promise<SelectQueryBuilder<Tag>> {
    const queryBuilder = this.createQueryBuilder('tag').leftJoinAndSelect(
      'tag.movieTags',
      'movie_tag',
    );

    return queryBuilder;
  }
  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const { name } = createTagDto;
    const tag = this.create({
      name,
    });

    await this.save(tag);
    return tag;
  }
}
