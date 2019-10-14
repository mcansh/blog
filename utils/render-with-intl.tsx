/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import { theme } from '~/config';

const renderWithIntl = (children: React.ReactNode) =>
  render(
    <ThemeProvider theme={theme}>
      <>{children}</>
    </ThemeProvider>
  );

export * from '@testing-library/react';
export { renderWithIntl as render };

export default renderWithIntl;
