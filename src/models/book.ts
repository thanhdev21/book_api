import mongoose from 'mongoose';

export interface BookSchema {
  title: string;
  description: string;
  isbn: string;
  uploadedBy: mongoose.Schema.Types.ObjectId;
  author: string;
  coverPhoto: mongoose.Schema.Types.ObjectId;
}

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isbn: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    author: { type: String, required: true },
    coverPhoto: { type: mongoose.Schema.Types.ObjectId, ref: 'medias', required: false },
  },
  { timestamps: true },
);
const BookModel = mongoose.model('books', BookSchema);

export default BookModel;
