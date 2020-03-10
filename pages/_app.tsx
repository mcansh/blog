import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { NProgress } from '@mcansh/next-nprogress';

import GlobalStyle from '~/components/styles/global-style';
import { colors } from '~/config';
import Document from '~/components/layouts/document';

const App = ({ Component, pageProps }: AppProps) => {
  const statusCode = pageProps?.statusCode ?? 200;

  return (
    <React.StrictMode>
      <ThemeProvider theme={colors}>
        <NProgress
          color={colors.primary}
          options={{ trickleSpeed: 50 }}
          spinner={false}
        />
        <GlobalStyle />
        {statusCode !== 200 ? (
          <Component {...pageProps} />
        ) : (
          <Document>
            <Component {...pageProps} />
          </Document>
        )}
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
