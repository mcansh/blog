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

const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

export { emojis };
export default randomEmoji;
