import React from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { render, cleanup } from 'react-testing-library';
import theme from '../config';

afterEach(cleanup);

const renderWithIntl = (children, intlProps = { locale: 'en' }) =>
  render(
    <IntlProvider {...intlProps}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </IntlProvider>
  );

export * from 'react-testing-library';
export { renderWithIntl as render };

export default renderWithIntl;
