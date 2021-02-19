/**
 * prevent widows
 * https://github.com/daneden/daneden.me/blob/aef50f0c54ebddd138e70d6a3ff711b184a8092f/src/utils/widont.ts
 */
function widont(subject: string): string {
  return subject.replace(/ ([^ ]*)$/, '\u00A0$1');
}

export { widont };
