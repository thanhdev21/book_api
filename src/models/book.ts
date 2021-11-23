import mongoose from 'mongoose';

export interface BookSchema {
  title: string;
  description: string;
  isbn: string;
  user: mongoose.Types.ObjectId;
}

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isbn: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
  },
  { timestamps: true },
);
const BookModel = mongoose.model('books', BookSchema);

export default BookModel;
