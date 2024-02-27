import { mockeryMapper as baseMockeryMapper } from '@anatine/zod-mock';
import { Faker, faker } from '@faker-js/faker';

const keyToFnMap: { [key: string]: () => string | number | boolean | Date } = {
    projectId: faker.string.uuid,
    // usernames: 0,
  };

export const mockeryMapper = (key: string, faker: Faker) => {
    return key && key in keyToFnMap
      ? keyToFnMap[key as keyof typeof keyToFnMap]
      : baseMockeryMapper(key, faker);
  };