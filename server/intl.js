import glob from 'glob';
import { basename, join } from 'path';
import { readFileSync } from 'fs';

const langFolder = join(__dirname, '..', 'lang');

// Get the supported languages by looking for translations in the `lang/` dir.
export const languages = glob
  .sync(`${langFolder}/*.json`)
  .map(f => basename(f, '.json'));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
export const localeDataCache = new Map();
export const getLocaleDataScript = locale => {
  const lang = locale.split('-')[0];
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
    const localeDataScript = readFileSync(localeDataFile, 'utf8');
    localeDataCache.set(lang, localeDataScript);
  }
  return localeDataCache.get(lang);
};

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
// eslint-disable-next-line global-require, import/no-dynamic-require
export const getMessages = locale => require(`${langFolder}/${locale}.json`);
