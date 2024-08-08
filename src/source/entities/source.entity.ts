import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Setup } from '../../setup/entities/setup.entity';

@Entity('sources')
export class Source {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Setup, (setup) => setup.sources)
  setups: Setup[];
}
