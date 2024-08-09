import { faker } from '@faker-js/faker';
import { Fund } from '../fund/entities/fund.entity';
import { ReportType } from '../report-type/entities/report-type.entity';
import { Report } from '../report/entities/report.entity';
import { Run } from '../run/entities/run.entity';
import {
  PlannerType,
  Setup,
  SystemConfigType,
  Trigger,
} from '../setup/entities/setup.entity';
import { Source } from '../source/entities/source.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const reportRepository = dataSource.getRepository(Report);
    const setupRepository = dataSource.getRepository(Setup);

    const reportTypeFactory = factoryManager.get(ReportType);
    const fundFactory = factoryManager.get(Fund);
    const runFactory = factoryManager.get(Run);
    const sourceFactory = factoryManager.get(Source);

    const funds = await fundFactory.saveMany(50);
    const sources = await sourceFactory.saveMany(50);
    const runs = await runFactory.saveMany(50);
    const reportTypes = await reportTypeFactory.saveMany(50);

    const _reports = [];

    reportTypes.forEach((reportType) => {
      _reports.push(
        ...Array(20)
          .fill(0)
          .map(() =>
            reportRepository.create({
              name: faker.commerce.productDescription(),
              type: reportType,
            }),
          ),
      );
    });

    const reports = await reportRepository.save(_reports, {
      transaction: true,
    });

    const opts = { min: 1, max: 3 };
    await setupRepository.save(
      Array(10000)
        .fill(0)
        .map(() =>
          setupRepository.create({
            name: faker.person.fullName(),
            description: faker.lorem.sentence(),
            plannerType: faker.helpers.enumValue(PlannerType),
            externalSystemConfig: faker.helpers.enumValue(SystemConfigType),
            triggers: faker.helpers.arrayElements(
              ['runs', 'sources', 'reports'],
              { min: 1, max: 3 },
            ) as Trigger[],
            funds: faker.helpers.arrayElements(funds, opts),
            sources: faker.helpers.arrayElements(sources, opts),
            runs: faker.helpers.arrayElements(runs, opts),
            reports: faker.helpers.arrayElements(reports, opts),
          }),
        ),
      { transaction: true, chunk: 100 },
    );
  }
}
