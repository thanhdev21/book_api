import { MutationResolvers } from '@graphql/types/generated-graphql-types';
import { createBook } from './createBook';
import { deleteBook } from './deleteBooks';

export const bookMutation: MutationResolvers = {
  createBook,
  deleteBook,
};
