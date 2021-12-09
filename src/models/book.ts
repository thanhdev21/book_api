import { Book } from '@graphql/types/generated-graphql-types';
import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema<Book>(
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
const BookModel = mongoose.models.books || mongoose.model('books', BookSchema);

export default BookModel;
