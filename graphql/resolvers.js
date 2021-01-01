import { people, getPersonById } from './database';

const resolvers = {
  Query: {
    people: () => people,
    // * _ means ignoring Present Object
    person: (_, { id }) => getPersonById(id),
  },
};

export default resolvers;
