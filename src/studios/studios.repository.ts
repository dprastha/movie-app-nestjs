import { EntityRepository, Repository } from 'typeorm';
import { CreateStudioDto } from './dto/create-studio.dto';
import { Studio } from './entities/studio.entity';

@EntityRepository(Studio)
export class StudiosRepository extends Repository<Studio> {
  async getStudios(): Promise<Studio[]> {
    return await this.find();
  }

  async createStudio(createStudioDto: CreateStudioDto): Promise<Studio> {
    const { studio_number, seat_capacity } = createStudioDto;

    const studio = this.create({
      studio_number,
      seat_capacity,
    });

    await this.save(studio);
    return studio;
  }
}
