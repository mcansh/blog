/* eslint-env jest */
import React from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { render } from 'react-testing-library';
import theme from '~/config.ts';

const renderWithIntl = (
  children: React.ReactNode,
  intlProps = { locale: 'en' }
) =>
  render(
    <IntlProvider {...intlProps}>
      <ThemeProvider theme={theme}>
        <>{children}</>
      </ThemeProvider>
    </IntlProvider>
  );

export * from 'react-testing-library';
export { renderWithIntl as render };

export default renderWithIntl;
