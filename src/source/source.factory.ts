import { Faker } from '@faker-js/faker';
import { Source } from './entities/source.entity';
import { setSeederFactory } from 'typeorm-extension';

export const SourceFactory = setSeederFactory(Source, (faker: Faker) => {
  const obj = new Source();
  obj.name = faker.lorem.words({ min: 3, max: 20 });
  return obj;
});
