import { EntityRepository, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {
  async getTags(): Promise<Tag[]> {
    const query = this.createQueryBuilder('tag').leftJoinAndSelect(
      'tag.movieTags',
      'movie_tag',
    );

    const tags = await query.getMany();
    return tags;
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
