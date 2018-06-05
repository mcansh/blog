import React, { Component } from 'react';
import NextError from 'next/error';
import { number } from 'prop-types';
import statusCodes from 'http-status-codes';
import styled from 'styled-components';
import Button from '../components/Button';

const ErrorWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  background: ${props => props.background};
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
  static propTypes = {
    statusCode: number,
  };

  static defaultProps = {
    statusCode: null,
  };

  static getInitialProps = ({ res, err }) => {
    if (res) return { statusCode: res.statusCode };
    else if (err) return { statusCode: err.statusCode };
    return { statusCode: null };
  };

  render() {
    const { statusCode } = this.props;

    const statusText = statusCodes.getStatusText(statusCode);

    if (statusCode === statusCodes.NOT_FOUND) {
      return (
        <ErrorWrapper background="black">
          <ErrorCode>{statusCode}</ErrorCode>
          <ErrorText>{statusText}</ErrorText>
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
