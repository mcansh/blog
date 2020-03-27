import randomEmoji from '~/utils/emojis';

it('returns a "random" emoji from the list', () => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.1;
  global.Math = mockMath;

  expect(randomEmoji()).toBe('🙌');
});
