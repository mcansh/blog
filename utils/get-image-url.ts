import {} from 'sharp';

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
  fm?: 'heic' | 'heif' | 'jpeg' | 'jpg' | 'png' | 'raw' | 'tiff' | 'webp';
}

const getImageUrl = (imagePath: string, options?: Options) => {
  const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  const base = `/api/image${path}`;
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
