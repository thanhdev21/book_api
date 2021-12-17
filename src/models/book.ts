import { Book } from '@graphql/types/generated-graphql-types';
import mongoose from 'mongoose';

interface IBook extends mongoose.Document, Book {
  _id: mongoose.Schema.Types.ObjectId;
}

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: { unique: true } },
    description: { type: String, required: true },
    isbn: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    author: { type: String, required: true },
    coverPhoto: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: false },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    deletedAt: {
      type: Date,
      default: null,
      nullable: true,
    },
  },
  { timestamps: true },
);
BookSchema.index({ title: 'text' });

const BookModel = mongoose.models['Book'] || mongoose.model<IBook>('Book', BookSchema, 'Book');

export default BookModel;
