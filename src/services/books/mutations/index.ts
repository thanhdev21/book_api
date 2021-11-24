import { MutationResolvers } from '@graphql/types/generated-graphql-types';
import { createBook } from './createBook';

export const bookMutation: MutationResolvers = {
  createBook,
};
