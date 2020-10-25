import { getImageUrl } from '~/utils/get-image-url';

it('returns a proper image url for the photo', () => {
  expect(getImageUrl('/static/images/posts/1_Wmv8hfi_bTHuHyV5CawnCw.jpg')).toBe(
    'https://mcansh.blog/_next/image?url=%2Fstatic%2Fimages%2Fposts%2F1_Wmv8hfi_bTHuHyV5CawnCw.jpg&w=1200&q=100'
  );
});

it('returns a proper image url for the photo with custom settings', () => {
  expect(
    getImageUrl('/static/images/posts/1_Wmv8hfi_bTHuHyV5CawnCw.jpg', {
      w: 400,
    })
  ).toBe(
    'https://mcansh.blog/_next/image?url=%2Fstatic%2Fimages%2Fposts%2F1_Wmv8hfi_bTHuHyV5CawnCw.jpg&w=400&q=100'
  );
});
