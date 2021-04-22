import { IImage } from '../interfaces';

export const fileToDataUri = (image: IImage) => {
  return new Promise((res) => {
    const reader = new FileReader();
    const { type, name, size } = image;
    reader.addEventListener('load', () => {
      res({ src: reader.result, name, type, size });
    });
    reader.readAsDataURL(image);
  });
};
