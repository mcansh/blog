import unsplashParams from '~/utils/unsplash-params';

it('returns nothing if no url is passed', () => {
  expect(unsplashParams()).toBe('');
});

it('returns nothing if the photo isnt from unsplash', () => {
  expect(
    unsplashParams(
      'https://avatars0.githubusercontent.com/u/11698668?s=460&v=4'
    )
  ).toBe('https://avatars0.githubusercontent.com/u/11698668?s=460&v=4');
});

it('returns the proper query string for a photo', () => {
  expect(unsplashParams('https://unsplash.com/photos/OPDy4nYsIQU')).toBe(
    'https://unsplash.com/photos/OPDy4nYsIQU?utm_source=unsplash&utm_medium=referral&utm_content=mcansh_blog'
  );
});
