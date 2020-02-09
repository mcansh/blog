import getCloudinaryURL from '~/utils/get-cloudinary-url';

it('returns a proper cloudinary url for the photo', () => {
  expect(getCloudinaryURL('1_Wmv8hfi_bTHuHyV5CawnCw.jpg')).toBe(
    'https://res.cloudinary.com/dof0zryca/image/upload/f_auto/v1581285181/blog/1_Wmv8hfi_bTHuHyV5CawnCw.jpg'
  );
});

it('returns a proper cloudinary url for the photo with custom  settings', () => {
  expect(
    getCloudinaryURL('1_Wmv8hfi_bTHuHyV5CawnCw.jpg', [
      'bo_26px_solid_rgb:ff0000',
      'z_3',
    ])
  ).toBe(
    'https://res.cloudinary.com/dof0zryca/image/upload/f_auto,bo_26px_solid_rgb:ff0000,z_3/v1581285181/blog/1_Wmv8hfi_bTHuHyV5CawnCw.jpg'
  );
});
