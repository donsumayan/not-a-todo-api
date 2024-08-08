import { Injectable } from '@nestjs/common';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Source } from './entities/source.entity';

@Injectable()
export class SourceService {
  constructor(
    @InjectRepository(Source)
    private repo: Repository<Source>,
  ) {}

  create(createSetupDto: CreateSourceDto) {
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

  update(id: number, updateSetupDto: UpdateSourceDto) {
    return this.repo.update(id, updateSetupDto);
  }

  async remove(id: number) {
    const {
      data: [setup],
    } = await this.findOne(id);

    return this.repo.remove(setup);
  }
}
