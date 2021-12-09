import { Resolvers, RoleCodes } from '@graphql/types/generated-graphql-types';
import { authMutations } from './auth/mutations';
import { bookMutation } from './books/mutations';
import { bookQueries } from './books/queries';
import { categoryMutation } from './category/mutations';
import { categoryQuery } from './category/queries';
import { mediaMutation } from './media/mutations';
import { userMutations } from './user/mutations';
import { userQueries } from './user/queries';

const resolvers: Resolvers = {
  Mutation: {
    ...authMutations,
    ...bookMutation,
    ...mediaMutation,
    ...userMutations,
    ...categoryMutation,
  },
  Query: {
    ...bookQueries,
    ...userQueries,
    ...categoryQuery,
  },
  RoleCodes: {
    ADMIN: RoleCodes.ADMIN,
    CONTENT_CREATOR: RoleCodes.CONTENT_CREATOR,
    USER: RoleCodes.USER,
  },
};

export default resolvers;
