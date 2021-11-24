import { Resolvers, RoleCodes, MediaType, MediaStatus } from '@graphql/types/generated-graphql-types';

import { authMutations } from './auth/mutations';
import { bookMutation } from './books/mutations';
import { bookQueries } from './books/queries';

const resolvers: Resolvers = {
  Mutation: {
    ...authMutations,
    ...bookMutation,
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
