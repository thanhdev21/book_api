import { Category } from '@graphql/types/generated-graphql-types';
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema<Category>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);
const CategoryModel = mongoose.models.categories || mongoose.model('categories', CategorySchema);

export default CategoryModel;
