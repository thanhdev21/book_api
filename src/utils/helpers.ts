import utf8 from 'utf8';
import base64 from 'base-64';

export const randomNumber = (length: number) => {
  var text = '';
  var possible = '123456789';
  for (var i = 0; i < length; i++) {
    var sup = Math.floor(Math.random() * possible.length);
    text += i > 0 && sup == i ? '0' : possible.charAt(sup);
  }
  return Number(text);
};

export const allowedVideoType = (mimeType: string) => {
  return ['video/mp4', 'video/webm', 'video/ogg'].indexOf(mimeType.toLowerCase()) !== -1;
};

export const allowedPhotoType = (mimetype: string) => {
  return ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml', 'image/x-dwg', 'image/vnd.dwg'].indexOf(mimetype.toLowerCase()) !== -1;
};

export const allowedPdfType = (mimetype: string) => {
  return ['application/pdf'].indexOf(mimetype.toLowerCase()) !== -1;
};

export const encodedID = (value: string) => {
  return base64.encode(utf8.encode(value));
};

export const decodedID = (encoded: string) => {
  const bytes = base64.decode(encoded);
  return utf8.decode(bytes);
};

export const uniqueKeys = (keys: any[]) => {
  return keys.filter((key, index) => {
    return keys.indexOf(key) === index;
  });
};
