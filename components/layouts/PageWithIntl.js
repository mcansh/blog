import React, { Component } from 'react';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';

if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

export default Page => {
  const IntlPage = injectIntl(Page);

  return class PageWithIntl extends Component {
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
      const { locale, messages, now, ...props } = this.props; // eslint-disable-line react/prop-types
      return (
        <IntlProvider locale={locale} messages={messages} initialNow={now}>
          <IntlPage {...props} />
        </IntlProvider>
      );
    }
  };
};
