import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Setup } from '../../setup/entities/setup.entity';

@Entity('runs')
export class Run {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Setup, (setup) => setup.funds)
  setups: Setup[];
}
