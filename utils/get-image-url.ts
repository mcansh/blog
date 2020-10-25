import { getDeploymentURL } from './get-deployment-url';

interface Options {
  /**
   @description desired width of image
  */
  w: number;
  /**
  @description desired height of image
  @default undefined - image original size
 */
  h?: number;
  /**
   @description quality
   @default 100
   */
  q?: number;
}

const defaultOptions: Options = { w: 1200, q: 100 };

const getImageUrl = (imagePath: string, options: Options = defaultOptions) => {
  const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  const root = getDeploymentURL();

  const encodedImagePath = encodeURIComponent(path);

  const base = `${root}/_next/image`;
  const query = new URLSearchParams(`url=${encodedImagePath}`);

  Object.entries({ ...defaultOptions, ...options }).forEach(([key, val]) => {
    if (val) {
      query.append(key, val.toString());
    }
  });

  return `${base}?${query.toString()}`;
};

export { getImageUrl };
