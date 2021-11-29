import { Media, MediaStatus } from '@graphql/types/generated-graphql-types';
import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    fileName: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    fileType: { type: String, required: true },
    status: { type: String, required: false, default: MediaStatus.Processing },
    path: { type: String, required: false },
    originUrl: { type: String, required: false },
    videoProfiles: { type: [], required: false, default: [] },
    duration: { type: Number, required: false },
  },
  { timestamps: true },
);
export const MediaModel = mongoose.model<Media>('Media', MediaSchema, 'Media');
