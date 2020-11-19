import React from 'react';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import styled from 'styled-components';
import Ink from 'react-ink';

interface Props extends LinkProps {
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

const StyledLink = styled.a`
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  text-align: center;
  text-decoration: none;
  line-height: 3.8rem;
  white-space: nowrap;
  font-weight: 500;
  min-width: 20rem;
  height: 4rem;
  padding: 0 2.5rem;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  flex-shrink: 0;
  color: #888;
  background-color: #000;
  border: 1px solid #333;
  transition: all 0.2s ease;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;

  &:hover {
    color: white;
    border: 1px solid white;
    background: black;
  }

  span {
    position: relative;
    line-height: 1.5;
  }
`;

const Button: React.FC<Props> = ({ children, ...nextProps }) => (
  <Link {...nextProps} passHref>
    <StyledLink>
      <span>{children}</span>
      <Ink />
    </StyledLink>
  </Link>
);

export default Button;
