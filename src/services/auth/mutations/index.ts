import { MutationResolvers } from '@graphql/types/generated-graphql-types';
import { register } from './register';
import { verifyClient } from './verifyClient';

export const authMutations: MutationResolvers = {
  verifyClient,
  register,
};
