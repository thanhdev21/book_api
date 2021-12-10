import { Book } from '@graphql/types/generated-graphql-types';
import mongoose from 'mongoose';

interface IBook extends mongoose.Document, Book {
  _id: string;
}

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isbn: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    author: { type: String, required: true },
    coverPhoto: { type: mongoose.Schema.Types.ObjectId, ref: 'medias', required: false },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true }],
  },
  { timestamps: true },
);
const BookModel = mongoose.models['books'] || mongoose.model<IBook>('books', BookSchema, 'books');

export default BookModel;
