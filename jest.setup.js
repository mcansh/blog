/* eslint-env jest */
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import Router from 'next/router';

const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;
