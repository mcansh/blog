import { getImageUrl } from '~/utils/get-image-url';

it('returns a proper image url for the photo', () => {
  expect(getImageUrl('1_Wmv8hfi_bTHuHyV5CawnCw.jpg')).toBe(
    '/api/image/static/images/posts/1_Wmv8hfi_bTHuHyV5CawnCw.jpg'
  );
});

it('returns a proper image url for the photo with custom settings', () => {
  expect(
    getImageUrl('1_Wmv8hfi_bTHuHyV5CawnCw.jpg', {
      fm: 'png',
      h: 400,
    })
  ).toBe(
    '/api/image/static/images/posts/1_Wmv8hfi_bTHuHyV5CawnCw.jpg?fm=png&h=400'
  );
});
