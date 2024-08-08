import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Fund } from '../../fund/entities/fund.entity';
import { Source } from '../../source/entities/source.entity';
import { Run } from '../../run/entities/run.entity';
import { Report } from '../../report/entities/report.entity';

export enum PlannerType {
  specific = 'specific',
  nonSpecific = 'non-specific',
}

export enum SystemConfigType {
  configA = 'config-a',
  configB = 'config-b',
}

export enum Trigger {
  runs = 'runs',
  sources = 'sources',
  reports = 'reports',
}

@Entity('setups')
export class Setup {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  @Index({
    unique: true,
  })
  name: string;

  @Column('varchar', {
    length: 120,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: PlannerType,
    default: PlannerType.nonSpecific,
  })
  plannerType: PlannerType;

  @Column({
    type: 'enum',
    enum: SystemConfigType,
    default: SystemConfigType.configA,
  })
  externalSystemConfig: SystemConfigType;

  @Column({
    type: 'enum',
    enum: Trigger,
    nullable: true,
    array: true,
  })
  triggers: Trigger[];

  @ManyToMany(() => Fund, (fund) => fund.setups, { eager: true, cascade: true })
  @JoinTable()
  funds: Fund[];

  @ManyToMany(() => Source, (source) => source.setups, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  sources: Source[];

  @ManyToMany(() => Run, (run) => run.setups, { eager: true, cascade: true })
  @JoinTable()
  runs: Run[];

  @ManyToMany(() => Report, (report) => report.setups, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  reports: Report[];
}
