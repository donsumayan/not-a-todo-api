import { Injectable } from '@nestjs/common';
import { CreateRunDto } from './dto/create-run.dto';
import { UpdateRunDto } from './dto/update-run.dto';
import { Run } from './entities/run.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RunService {
  constructor(
    @InjectRepository(Run)
    private repo: Repository<Run>,
  ) {}

  create(createSetupDto: CreateRunDto) {
    return this.repo.save(this.repo.create(createSetupDto));
  }

  async findAll(options?: { pageSize?: number; page?: number; name?: string }) {
    const { page = 0, pageSize = 10, name } = options || {};

    const [data, count] = await this.repo.findAndCount({
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
    const data = await this.repo.findOne({
      where: {
        id,
      },
    });

    return {
      data: [data],
    };
  }

  update(id: number, updateSetupDto: UpdateRunDto) {
    return this.repo.update(id, updateSetupDto);
  }

  async remove(id: number) {
    const {
      data: [setup],
    } = await this.findOne(id);

    return this.repo.remove(setup);
  }
}
