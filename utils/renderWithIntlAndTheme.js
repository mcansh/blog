import React from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import theme from '../config';

const renderWithIntlReduxAndTheme = (
  children,
  intlProps = { locale: 'en' }
) => (
  <IntlProvider {...intlProps}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </IntlProvider>
);

export default renderWithIntlReduxAndTheme;
