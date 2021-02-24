/**
 * prevent widows
 * https://github.com/daneden/daneden.me/blob/65cf4b7ec34629fefaf72a72cfa7440403bf1bd7/src/utils/widont.ts
 */
function widont(subject: string): string {
  const words = subject.split(' ');
  const lastTwo = words.slice(-2).join(' ');

  if (lastTwo.length >= 15) {
    return subject;
  } else {
    return subject.replace(/ ([^ ]*)$/, '\u00A0$1');
  }
}

export { widont };
