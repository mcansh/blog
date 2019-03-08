const getCloudinaryURL = (image: string, settings: string[] = []) => {
  const base = 'https://res.cloudinary.com/dof0zryca/image/upload';
  const id = 'v1541889199/blog';
  const settingsString = ['f_auto', ...settings].join(',');

  return `${base}/${settingsString}/${id}/${image}`;
};

export default getCloudinaryURL;
