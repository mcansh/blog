interface Options {
  w?: number;
  h?: number;
  fm?: string;
}

const getImageUrl = (image: string, options?: Options) => {
  const base = '/api/image/static/images/posts';
  const query = new URLSearchParams();

  if (options) {
    Object.entries(options).forEach(item => {
      query.append(...item);
    });

    return `${base}/${image}?${query.toString()}`;
  }

  return `${base}/${image}`;
};

export { getImageUrl };
