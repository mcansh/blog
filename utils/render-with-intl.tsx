/* eslint-env jest */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from 'react-testing-library';
import theme from '~/config';

const renderWithIntl = (children: React.ReactNode) =>
  render(
    <ThemeProvider theme={theme}>
      <>{children}</>
    </ThemeProvider>
  );

export * from 'react-testing-library';
export { renderWithIntl as render };

export default renderWithIntl;
