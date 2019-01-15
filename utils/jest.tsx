import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line import/no-extraneous-dependencies
import { IntlProvider } from 'react-intl';

const createComponentWithIntl = (children, props = { locale: 'en' }) =>
  renderer.create(<IntlProvider {...props}>{children}</IntlProvider>);

export default createComponentWithIntl;
