// @flow
import React, { type Node } from "react";
import styled from "styled-components";
import Meta from "../Meta";
import Header from "../Header";

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
  options: {
    id: string
  }
};

const Post = ({ children, ...options }: Props) => (
  <>
    {/* $FlowFixMe not sure how to tell flow that Meta is wrapped in withRouter */}
    <Meta {...options} />
    <Header {...options} />
    <PostWrap>{children}</PostWrap>
  </>
);

export default Post;
