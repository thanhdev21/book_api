import firebase from 'firebase-admin';
import serviceAccount from '../book-backend-traning-firebase-cert.json';

const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

const admin = firebase.initializeApp({
  credential: firebase.credential.cert(params),
});

const storageRef = admin.storage().bucket(`gs://book-backend-traning.appspot.com/`);

export const uploadFile = async (buffer, filename, folder) => {
  // Upload the File

  const file = storageRef.file(`${folder}/${filename}`);
  return file
    .save(buffer)
    .then((stuff) => {
      return file.getSignedUrl({
        action: 'read',
        expires: '12-31-3000',
      });
    })
    .then((urls) => {
      const url = urls[0];
      console.log(`Image url = ${url}`);
      return url;
    })
    .catch((err) => {
      console.log(`Unable to upload image ${err}`);
    });
};

export const genFirebaseStorageFolderName = (name) => {
  switch (name) {
    case 'IMAGE':
      return 'image';
    case 'VIDEO':
      return 'video';
    case 'PDF':
      return 'pdf';
    default:
      return 'image';
  }
};
