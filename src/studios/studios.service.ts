import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { Studio } from './entities/studio.entity';
import { StudiosRepository } from './studios.repository';

@Injectable()
export class StudiosService {
  constructor(
    @InjectRepository(StudiosRepository)
    private studiosRepository: StudiosRepository,
  ) {}

  async findAll(options: IPaginationOptions): Promise<Pagination<Studio>> {
    const studios = await this.studiosRepository.getStudios();

    return paginate<Studio>(studios, options);
  }

  create(createStudioDto: CreateStudioDto): Promise<Studio> {
    return this.studiosRepository.createStudio(createStudioDto);
  }

  async findOne(id: number): Promise<Studio> {
    const found = await this.studiosRepository.findOne(id, {
      relations: ['movieSchedules'],
    });

    if (!found) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }

    return found;
  }

  async update(id: number, updateStudioDto: UpdateStudioDto): Promise<Studio> {
    const { studioNumber, seatCapacity } = updateStudioDto;
    const studio = await this.findOne(id);

    studio.studioNumber = studioNumber;
    studio.seatCapacity = seatCapacity;

    await this.studiosRepository.save(studio);
    return studio;
  }

  async remove(id: number): Promise<void> {
    const result = await this.studiosRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
