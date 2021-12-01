import env from '@/env';
import { checkAuth } from '@/middleware/auth';
import { createMedia } from '@business/media';
import { ErrorCodes, Media, MediaStatus, MediaType, MutationResolvers } from '@graphql/types/generated-graphql-types';
import { makeGraphqlError } from '@utils/error';
import { uploadFile } from '@utils/firestore';
import { allowedPhotoType } from '@utils/helpers';
// import Queues from '@services/worker/typed-queue';
import { makeSlug } from '@utils/upload';
import { createWriteStream, unlink } from 'fs';
import mkdirp from 'mkdirp';

export const uploadMedia: MutationResolvers['uploadMedia'] = async (_, { file }, context) => {
  const {
    file: { createReadStream, filename: _filename, mimetype },
  } = await file;
  const auth = await checkAuth(context);
  const stream = createReadStream();

  let uploadType: 'IMAGE' | null = null;
  let rootDir: string = null;
  if (allowedPhotoType(mimetype)) {
    uploadType = 'IMAGE';
    rootDir = env.imageDir;
  }

  if (!uploadType) {
    throw makeGraphqlError('Not allowed mime type', ErrorCodes.BadUserInput);
  }

  const folderDir = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`;

  const filename = makeSlug(_filename);
  await mkdirp(`${rootDir}/${folderDir}`);
  const mediaDir = `${rootDir}/${folderDir}/${filename}`;

  const uri = await uploadFile(mediaDir, filename, 'image');

  const media: Media = await new Promise((resolve, reject) => {
    const writeStream = createWriteStream(mediaDir);

    writeStream.on('finish', async () => {
      let createData = {
        createdBy: auth.userId,
        path: `${folderDir}/${filename}`,
        fileName: filename,
        fileType: mimetype,
        type: MediaType.Photo,
        status: MediaStatus.Ready,
        size: undefined,
        title: filename,
      };
      const media = await createMedia(createData);

      resolve(media);
    });

    writeStream.on('error', (error) => {
      unlink(`${mediaDir}`, () => {
        reject(error);
      });
    });

    stream.on('error', (error) => writeStream.destroy(error));
    stream.pipe(writeStream);
  });

  return media;
};
