// "size-limit": [
//   {
//     "path": ".next/dist/bundles/**/*.js",
//     "webpack": false,
//     "limit": "300 KB"
//   }
// ]

const {readdir} = require('mz/fs');
const pages = '.next/dist/bundles/pages';

const getPageSize = async () => {
  try {
    const files = await readdir(pages);
    return files.map(file => {
      const checkForMap = file.replace('.js.map', '.map');
      const extension = checkForMap.split('.')

      if (extension === 'map') return;

      return {
        path: `${pages}/${file}`,
        webpack: false,
        limit: "20 KB"
      }
    })
  }
  catch (err) { console.error( err ) }
};

module.exports = getPageSize()
