// @flow

import * as React from 'react';
import styled from 'styled-components';
import Meta from '../Meta';
import Header from '../Header';

const PostWrap = styled.div`
  margin: 3rem auto 0 auto;
  max-width: 90rem;
  width: 95%;
  min-height: calc(100vh - 50rem);
  padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
  padding: 0 constant(safe-area-inset-right) 0 constant(safe-area-inset-left);
`;

const Post = ({ children, ...options }: { children: React.Node }) => (
  <>
    <Meta id={options.id} />
    <Header id={options.id} />
    <PostWrap>{children}</PostWrap>
  </>
);

export default Post;
