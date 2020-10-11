beforeAll(() => {
  process.env.VERCEL_URL = 'https://mcansh.blog';
});

afterAll(() => {
  delete process.env.VERCEL_URL;
});
