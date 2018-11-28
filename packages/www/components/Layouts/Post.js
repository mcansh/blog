// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/tag';
import Paragraph from '../Type/Paragraph';
import Meta from '../Meta';
import Header from '../Header';
import FindPost from '../../utils/FindPost';
import { Code, InlineCode } from '../Code';

const PostWrap = styled.div`
  margin: 3rem auto 0 auto;
  max-width: 90rem;
  width: 95%;
  min-height: calc(100vh - 50rem);
  padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
  padding: 0 constant(safe-area-inset-right) 0 constant(safe-area-inset-left);
`;

type Props = {
  children: Node,
  id: string,
};

const Post = ({ children, id }: Props) => (
  <MDXProvider
    components={{ p: Paragraph, inlineCode: InlineCode, code: Code }}
  >
    <FindPost id={id}>
      {post => {
        if (!post) return null;
        return (
          <>
            <Meta id={id} />
            <Header {...post} />
            <PostWrap>{children}</PostWrap>
          </>
        );
      }}
    </FindPost>
  </MDXProvider>
);

export default Post;
