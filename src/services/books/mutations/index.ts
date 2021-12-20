import { MutationResolvers } from '@graphql/types/generated-graphql-types';
import { createBook } from './createBook';
import { deleteBook } from './deleteBooks';
import { updateBook } from './updateBook';

export const bookMutation: MutationResolvers = {
  createBook,
  deleteBook,
  updateBook,
};
