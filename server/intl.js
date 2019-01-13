const glob = require('glob')
const { basename, join } = require('path')
const { readFileSync } = require('fs')
const accepts = require('accepts')
const { version } = require('../package.json')

const dev = process.env.NODE_ENV === 'development';
const langFolder = join(__dirname, '..', 'lang');

// Get the supported languages by looking for translations in the `lang/` dir.
const languages = glob
  .sync(`${langFolder}/*.json`)
  .map(f => basename(f, '.json'));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map();
const getLocaleDataScript = locale => {
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
const getMessages = locale => require(`${langFolder}/${locale}.json`);

const configureIntl = (req, res, next) => {
  const accept = accepts(req);
  const locale = accept.language(languages) || 'en';

  req.locale = locale;
  req.localeDataScript = getLocaleDataScript(locale);
  req.messages = dev ? {} : getMessages(locale);
  res.setHeader('X-App-Version', version);
  next();
};

module.languages = languages
module.localeDataCache = localeDataCache;
module.getLocaleDataScript = getLocaleDataScript;
module.getMessages = getMessages;
module.exports =  configureIntl;
