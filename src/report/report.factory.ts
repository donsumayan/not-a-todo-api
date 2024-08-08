import { Faker } from '@faker-js/faker';
import { Report } from './entities/report.entity';
import { setSeederFactory } from 'typeorm-extension';

export const ReportFactory = setSeederFactory(Report, (faker: Faker) => {
  const obj = new Report();
  obj.name = faker.lorem.words(15);
  return obj;
});
