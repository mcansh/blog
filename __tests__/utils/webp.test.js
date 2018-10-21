import webp from '../../utils/webp';

describe('webp utilities', () => {
  it('takes an image and returns the webp version', () => {
    const image = 'luke-pamer-5951.jpg';
    const { url, type } = webp(image);

    expect(url).toEqual('luke-pamer-5951.webp');
    expect(type).toEqual('image/jpeg');
  });
});
