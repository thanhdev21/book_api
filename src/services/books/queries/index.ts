import { QueryResolvers } from '@graphql/types/generated-graphql-types';
import { getAllBooks } from './getAllBooks';
import { getBook } from './getBook';

export const bookQueries: QueryResolvers = {
  getAllBooks,
  getBook,
};
