import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { Fund } from './fund/entities/fund.entity';
import { Report } from './report/entities/report.entity';
import { ReportType } from './report-type/entities/report-type.entity';
import { Run } from './run/entities/run.entity';
import { Setup } from './setup/entities/setup.entity';
import { Source } from './source/entities/source.entity';
import { MainSeeder } from './_seeder/main.seeder';

const host = process.env.POSTGRES_HOST || 'localhost';
const username = process.env.POSTGRES_USER || 'username1';
const password = process.env.POSTGRES_PASSWORD || 'password1';
const database = process.env.POSTGRES_DB || 'notatodo';
const port = process.env.POSTGRES_PORT;

(async () => {
  const options: DataSourceOptions = {
    port: port ? +port : 5432,
    type: 'postgres',
    host,
    username,
    password,
    database,
    entities: [Fund, Report, ReportType, Run, Setup, Source],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();
  await dataSource.dropDatabase();
  await dataSource.synchronize(true);

  await runSeeders(dataSource, {
    seeds: [MainSeeder],
    factories: ['src/**/*.factory.ts'],
    seedTracking: true,
  });

  process.exit();
})();
