/* eslint-env jest */
import Router from 'next/router';

const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;
