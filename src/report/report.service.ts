import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private repo: Repository<Report>,
  ) {}

  create(createSetupDto: CreateReportDto) {
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

  update(id: number, updateSetupDto: UpdateReportDto) {
    return this.repo.update(id, updateSetupDto);
  }

  async remove(id: number) {
    const {
      data: [setup],
    } = await this.findOne(id);

    return this.repo.remove(setup);
  }
}
