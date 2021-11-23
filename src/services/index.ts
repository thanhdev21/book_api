import { Resolvers, RoleCodes, MediaType, MediaStatus } from '@graphql/types/generated-graphql-types';

import { authMutations } from './auth/mutations';
import { bookQueries } from './books/queries';

const resolvers: Resolvers = {
  Mutation: {
    ...authMutations,
  },
  Query: {
    ...bookQueries,
  },

  RoleCodes: {
    ADMIN: RoleCodes.ADMIN,
    CLIENT: RoleCodes.CLIENT,
    USER: RoleCodes.USER,
  },
};

export default resolvers;
