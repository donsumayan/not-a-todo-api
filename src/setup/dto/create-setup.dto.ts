import { Fund } from 'src/fund/entities/fund.entity';
import {
  PlannerType,
  SystemConfigType,
  Trigger,
} from '../entities/setup.entity';
import { Source } from 'src/source/entities/source.entity';
import { Run } from 'src/run/entities/run.entity';
import { Report } from 'src/report/entities/report.entity';

export class CreateSetupDto {
  name: string;
  plannerType: PlannerType;
  externalSystemConfig: SystemConfigType;
  triggers: Trigger[];
  funds: Fund[];
  sources: Source[];
  runs: Run[];
  reports: Report[];
}
