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
  '🌮',
];

function randomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

export { emojis };
export default randomEmoji;
