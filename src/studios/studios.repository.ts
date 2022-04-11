import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateStudioDto } from './dto/create-studio.dto';
import { Studio } from './entities/studio.entity';

@EntityRepository(Studio)
export class StudiosRepository extends Repository<Studio> {
  async getStudios(): Promise<SelectQueryBuilder<Studio>> {
    const queryBuilder = this.createQueryBuilder('studio').leftJoinAndSelect(
      'studio.movieSchedules',
      'movie_schedule',
    );

    return queryBuilder;
  }

  async createStudio(createStudioDto: CreateStudioDto): Promise<Studio> {
    const { studioNumber, seatCapacity } = createStudioDto;

    const studio = this.create({
      studioNumber,
      seatCapacity,
    });

    await this.save(studio);
    return studio;
  }
}
