import { MutationResolvers } from '@graphql/types/generated-graphql-types';
import { login } from './login';
import { register } from './register';

export const authMutations: MutationResolvers = {
  register,
  login,
};
