import env from '@/env';
import { checkAuth } from '@/middleware/auth';
import { createMedia } from '@business/media';
import { ErrorCodes, MediaStatus, MediaType, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { genFirebaseStorageFolderName, uploadFile } from '@utils/firebase-storage';
import { allowedPdfType, allowedPhotoType, allowedVideoType } from '@utils/helpers';
// import Queues from '@services/worker/typed-queue';
import { makeSlug, streamToBuffer } from '@utils/upload';

export const uploadMedia: MutationResolvers['uploadMedia'] = async (_, { file }, context) => {
  const {
    file: { createReadStream, filename: _filename, mimetype },
  } = await file;
  const auth = await checkAuth(context);
  const stream = createReadStream();

  let uploadType: 'VIDEO' | 'IMAGE' | 'PDF' | null = null;

  if (allowedPhotoType(mimetype)) {
    uploadType = 'IMAGE';
  } else if (allowedVideoType(mimetype)) {
    uploadType = 'VIDEO';
  } else if (allowedPdfType(mimetype)) {
    uploadType = 'PDF';
  }

  if (!uploadType) {
    throw makeGraphqlError('Not allowed mime type', ErrorCodes.BadUserInput);
  }

  const folderDir = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`;

  const filename = makeSlug(_filename);

  const buffer = await streamToBuffer(stream);

  const uri = await uploadFile(buffer, filename, genFirebaseStorageFolderName(uploadType));

  let createData = {
    createdBy: auth.userId,
    path: `${folderDir}/${filename}`,
    fileName: filename,
    fileType: mimetype,
    type: MediaType.Photo,
    status: MediaStatus.Ready,
    size: undefined,
    title: filename,
    originUrl: uri,
  };
  const media = await createMedia(createData);

  return media;
};
