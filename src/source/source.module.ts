import { Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Source } from './entities/source.entity';

@Module({
  controllers: [SourceController],
  providers: [SourceService],
  imports: [TypeOrmModule.forFeature([Source])],
})
export class SourceModule {}
