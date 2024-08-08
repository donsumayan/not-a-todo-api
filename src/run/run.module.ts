import { Module } from '@nestjs/common';
import { RunService } from './run.service';
import { RunController } from './run.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Run } from './entities/run.entity';

@Module({
  controllers: [RunController],
  providers: [RunService],
  imports: [TypeOrmModule.forFeature([Run])],
})
export class RunModule {}
