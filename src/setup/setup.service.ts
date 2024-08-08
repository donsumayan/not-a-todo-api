import { Injectable } from '@nestjs/common';
import { CreateSetupDto } from './dto/create-setup.dto';
import { UpdateSetupDto } from './dto/update-setup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setup } from './entities/setup.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class SetupService {
  constructor(
    @InjectRepository(Setup)
    private setupRepo: Repository<Setup>,
  ) {}

  create(createSetupDto: CreateSetupDto) {
    return this.setupRepo.save(this.setupRepo.create(createSetupDto));
  }

  async findAll(options?: { pageSize?: number; page?: number; name?: string }) {
    const { page = 0, pageSize = 10, name } = options || {};

    const [data, count] = await this.setupRepo.findAndCount({
      skip: page * pageSize,
      take: pageSize,
      where: {
        ...(name ? { name: ILike(`%${name}%`) } : {}),
      },
    });

    return {
      data,
      page,
      pageSize,
      count,
    };
  }

  async findOne(id: number) {
    const data = await this.setupRepo.findOne({
      where: {
        id,
      },
    });

    return {
      data: [data],
    };
  }

  update(id: number, updateSetupDto: UpdateSetupDto) {
    return this.setupRepo.update(id, updateSetupDto);
  }

  async remove(id: number) {
    const {
      data: [setup],
    } = await this.findOne(id);

    return this.setupRepo.remove(setup);
  }
}
