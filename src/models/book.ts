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
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    author: { type: String, required: true },
    coverPhoto: { type: mongoose.Schema.Types.ObjectId, ref: 'medias', required: false },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true }],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);
BookSchema.index({ title: 'text' });

const BookModel = mongoose.models['books'] || mongoose.model<IBook>('books', BookSchema, 'books');

export default BookModel;
