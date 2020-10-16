import { getDeploymentURL } from './get-deployment-url';

interface Options {
  /**
   @description desired width of image
   @default undefined - image original size
  */
  w?: number;
  /**
  @description desired height of image
  @default undefined - image original size
 */
  h?: number;
  /**
   @description desired format of image
   @default jpg or whatever the original image extension is
  */
  fm?: 'jpeg' | 'jpg' | 'png' | 'raw' | 'tiff' | 'webp';
}

const getImageUrl = (imagePath: string, options?: Options) => {
  const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  const root = getDeploymentURL();

  const encodedImagePath = encodeURIComponent(root + path);

  const base = `${root}/_next/image?url=${encodedImagePath}`;
  const query = new URLSearchParams();

  if (options) {
    Object.entries(options).forEach(item => {
      query.append(...item);
    });

    return `${base}?${query.toString()}`;
  }

  return base;
};

export { getImageUrl };
