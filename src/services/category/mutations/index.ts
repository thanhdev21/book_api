import { MutationResolvers } from '@graphql/types/generated-graphql-types';
import { createCategory } from './createCategory';
import { updateCategory } from './updateCategory';

export const categoryMutation: MutationResolvers = {
  createCategory,
  updateCategory,
};
