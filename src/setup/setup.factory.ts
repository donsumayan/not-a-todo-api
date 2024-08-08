import { Faker } from '@faker-js/faker';
import {
  PlannerType,
  Setup,
  SystemConfigType,
  Trigger,
} from './entities/setup.entity';
import { setSeederFactory } from 'typeorm-extension';

export const SetupFactory = setSeederFactory(Setup, (faker: Faker) => {
  const setup = new Setup();
  setup.name = faker.person.fullName();
  setup.description = faker.person.jobDescriptor();
  setup.plannerType = faker.helpers.enumValue(PlannerType);
  setup.externalSystemConfig = faker.helpers.enumValue(SystemConfigType);
  setup.triggers = faker.helpers.arrayElements(['runs', 'sources', 'reports'], {
    min: 1,
    max: 3,
  }) as Trigger[];
  return setup;
});
