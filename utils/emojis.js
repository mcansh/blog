// @flow

const emojis = [
  '😁',
  '🤙',
  '🙌',
  '🍻',
  '🔥',
  '😬',
  '👍',
  '🐬',
  '👀',
  '👌',
  '😉',
  '💪',
  '💩',
  '🎉',
  '💣',
  '😘',
  '😜',
  '🙏',
  '👋',
  '💎',
  '🚀',
  '💰',
];

function randomEmoji(): string {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

export { emojis };
export default randomEmoji;
