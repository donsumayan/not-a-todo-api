import { Faker } from '@faker-js/faker';
import { ReportType } from './entities/report-type.entity';
import { setSeederFactory } from 'typeorm-extension';

export const ReportTypeFactory = setSeederFactory(
  ReportType,
  (faker: Faker) => {
    const obj = new ReportType();

    obj.name = [
      faker.location.country(),
      faker.color.human(),
      faker.animal.type(),
    ].join(' ');
    return obj;
  },
);
