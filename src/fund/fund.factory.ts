import { Faker } from '@faker-js/faker';
import { Fund } from './entities/fund.entity';
import { setSeederFactory } from 'typeorm-extension';

export const FundFactory = setSeederFactory(Fund, (faker: Faker) => {
  const fund = new Fund();
  fund.name = faker.commerce.productName();
  fund.alias = faker.commerce.productAdjective();
  return fund;
});
