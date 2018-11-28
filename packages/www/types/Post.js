export type ImageType = {
  imageUrl: string,
  name?: string,
  url?: string,
};

export type PostType = {
  id: string,
  date: number,
  title: string,
  image: ImageType,
};
