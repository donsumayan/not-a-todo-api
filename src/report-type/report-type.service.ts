import { Injectable } from '@nestjs/common';
import { CreateReportTypeDto } from './dto/create-report-type.dto';
import { UpdateReportTypeDto } from './dto/update-report-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportType } from './entities/report-type.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ReportTypeService {
  constructor(
    @InjectRepository(ReportType)
    private repo: Repository<ReportType>,
  ) {}

  create(createSetupDto: CreateReportTypeDto) {
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

  update(id: number, updateSetupDto: UpdateReportTypeDto) {
    return this.repo.update(id, updateSetupDto);
  }

  async remove(id: number) {
    const {
      data: [setup],
    } = await this.findOne(id);

    return this.repo.remove(setup);
  }
}
