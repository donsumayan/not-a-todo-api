import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportType } from '../../report-type/entities/report-type.entity';
import { Setup } from '../../setup/entities/setup.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @ManyToOne(() => ReportType, { eager: true })
  type: ReportType;

  @ManyToMany(() => Setup, (setup) => setup.reports)
  setups: Setup[];
}
