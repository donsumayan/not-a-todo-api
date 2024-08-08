import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('report_types')
export class ReportType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;
}
