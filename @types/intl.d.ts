/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint no-useless-constructor: "off"*/

declare namespace Intl {
  type Unit =
    | 'year'
    | 'quarter'
    | 'month'
    | 'week'
    | 'day'
    | 'hour'
    | 'minute'
    | 'second';

  class RelativeTimeFormat {
    public constructor(
      locale: string,
      options: {
        /* @default 'best fit' */
        localeMatcher?: 'lookup' | 'best fit';
        /* @default 'always' */
        numeric?: 'always' | 'auto';
        /* @default 'long' */
        style?: 'long' | 'short' | 'narrow';
      }
    );

    public format(value: number, unit: Unit): string;
    public formatToParts(
      value: number,
      unit: Unit
    ): (
      | { type: 'literal' | 'integer'; value: string }
      | { type: 'literal' | 'integer'; value: string; unit: Unit }
    )[];
  }
}
