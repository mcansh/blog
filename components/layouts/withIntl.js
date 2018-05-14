import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

export default Page => {
  const IntlPage = injectIntl(Page);

  return class PageWithIntl extends Component {
    static propTypes = {
      locale: PropTypes.string,
      now: PropTypes.number,
      messages: PropTypes.shape({}),
    };

    static defaultProps = {
      locale: 'en',
      now: Date.now(),
      messages: {},
    };

    static async getInitialProps(context) {
      let props;
      if (typeof Page.getInitialProps === 'function') {
        props = await Page.getInitialProps(context);
      }

      const { req } = context;
      // eslint-disable-next-line no-underscore-dangle
      const { locale, messages } = req || window.__NEXT_DATA__.props;

      const now = Date.now();

      return { ...props, locale, messages, now };
    }

    render() {
      const { locale, messages, now, ...props } = this.props;

      return (
        <IntlProvider
          locale={locale}
          messages={messages}
          initialNow={now}
          tagName={Fragment}
        >
          <IntlPage {...props} />
        </IntlProvider>
      );
    }
  };
};
