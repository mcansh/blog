import React, { Component } from 'react';
import NextError from 'next/error';
import styled from 'styled-components';
import Button from '../components/Button';

const ErrorWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  background: ${({ background }) => background};
  color: white;
`;

const ErrorText = styled.h2`
  font-size: 2rem;
`;

const ErrorCode = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

class Error extends Component {
  static defaultProps = {
    statusCode: null,
  };

  // $FlowIssue
  static getInitialProps = ({ res, err }) => {
    if (res) return { statusCode: res.statusCode };
    if (err) return { statusCode: err.statusCode };
    return { statusCode: null };
  };

  render() {
    const { statusCode } = this.props;

    if (statusCode === 404) {
      return (
        <ErrorWrapper background="black">
          <ErrorCode>{statusCode}</ErrorCode>
          <ErrorText>Not Found</ErrorText>
          <Button
            link="/"
            prefetch
            text="Go Home"
            background="white"
            color="black"
          />
        </ErrorWrapper>
      );
    }

    return <NextError statusCode={statusCode} />;
  }
}

export default Error;
