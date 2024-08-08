import { Faker } from '@faker-js/faker';
import { Run } from './entities/run.entity';
import { setSeederFactory } from 'typeorm-extension';

export const RunFactory = setSeederFactory(Run, (faker: Faker) => {
  const obj = new Run();
  obj.name = faker.lorem.words({ min: 2, max: 5 });
  return obj;
});
