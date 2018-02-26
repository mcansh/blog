const webp = image => {
  const imageRegex = /png|jpg/;
  const url = image.replace(imageRegex, 'webp');
  const [type] = image.match(imageRegex);

  return { url, type };
};

export default webp;
