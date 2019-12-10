import React from 'react';
import { NextPage } from 'next';
import NextError, { ErrorProps } from 'next/error';

const ErrorPage: NextPage<ErrorProps> = props => <NextError {...props} />;

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return new Promise(resolve => resolve({ statusCode }));
};

export default ErrorPage;
