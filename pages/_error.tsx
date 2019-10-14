import React from 'react';
import { NextPage } from 'next';
import NextError, { ErrorProps } from 'next/error';
import * as Sentry from '@sentry/node';

interface Props extends ErrorProps {
  hasGetInitialPropsRun?: boolean;
  err?: Error;
}

const MyError: NextPage<Props> = ({
  statusCode,
  hasGetInitialPropsRun,
  err,
}) => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/zeit/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
  }

  return <NextError statusCode={statusCode} />;
};

MyError.getInitialProps = async context => {
  const { res, err, asPath } = context;
  const errorInitialProps = await NextError.getInitialProps(context);

  if (res) {
    // Running on the server, the response object is available.
    //
    // Next.js will pass an err on the server if a page's `getInitialProps`
    // threw or returned a Promise that rejected

    if (res.statusCode === 404) {
      // Opinionated: do not record an exception in Sentry for 404
      return { statusCode: 404 };
    }

    if (err) {
      Sentry.captureException(err);

      // Workaround for https://github.com/zeit/next.js/issues/8592, mark when
      // getInitialProps has run
      return { ...errorInitialProps, hasGetInitialPropsRun: true };
    }
  } else if (err) {
    // Running on the client (browser).
    //
    // Next.js will provide an err if:
    //
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html
    Sentry.captureException(err);

    return errorInitialProps;
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );

  return errorInitialProps;
};

export default MyError;
