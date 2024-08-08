import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Setup } from '../../setup/entities/setup.entity';

@Entity('funds')
export class Fund {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true })
  name: string;

  @Column('varchar', { nullable: true })
  alias: string;

  @ManyToOne(() => Setup, (setup) => setup.funds)
  setups: Setup[];
}
