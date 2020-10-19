import randomEmoji from '~/utils/emojis';

let originalMath: Math;

beforeAll(() => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.1;
  global.Math = mockMath;
});

afterAll(() => {
  global.Math = originalMath;
});

it('returns a "random" emoji from the list', () => {
  expect(randomEmoji()).toBe('🙌');
});
