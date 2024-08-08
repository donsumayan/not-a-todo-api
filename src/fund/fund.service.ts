import { Injectable } from '@nestjs/common';
import { CreateFundDto } from './dto/create-fund.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Fund } from './entities/fund.entity';
import { UpdateSetupDto } from '../setup/dto/update-setup.dto';

@Injectable()
export class FundService {
  constructor(
    @InjectRepository(Fund)
    private repo: Repository<Fund>,
  ) {}

  create(createSetupDto: CreateFundDto) {
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

  update(id: number, updateSetupDto: UpdateSetupDto) {
    return this.repo.update(id, updateSetupDto);
  }

  async remove(id: number) {
    const {
      data: [setup],
    } = await this.findOne(id);

    return this.repo.remove(setup);
  }
}
