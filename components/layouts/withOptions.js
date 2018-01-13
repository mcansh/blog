import React from 'react';
import Post from './Post';
import Meta from '../Meta';
import Header from '../Header';

export default options => content => () => (
  <Post>
    <Meta {...options} />
    <Header {...options} />
    {content}
  </Post>
);
