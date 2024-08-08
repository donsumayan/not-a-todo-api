import { Module } from '@nestjs/common';
import { ReportTypeService } from './report-type.service';
import { ReportTypeController } from './report-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportType } from './entities/report-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportType])],
  controllers: [ReportTypeController],
  providers: [ReportTypeService],
})
export class ReportTypeModule {}
