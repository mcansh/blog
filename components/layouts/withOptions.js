import React from 'react';
import Page from './Page';
import Meta from '../Meta';
import Header from '../Header';

export default options => content => () => (
  <Page>
    <Meta {...options} />
    <Header {...options} />
    {content}
  </Page>
);
