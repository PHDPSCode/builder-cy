import { faker } from '@faker-js/faker';

faker.locale = 'pt_BR';

const { random } = faker;
export default {
  ...faker,

  random: {
    ...random,

    /**
     * @returns {number}
     */
    id: () => faker.datatype.number({ min: 1, max: 1000 }),

    /**
     * @param length {number}
     * @returns {number}
     */
  },
};