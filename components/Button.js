import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const StyledLink = styled.a`
  margin: 3rem 0 0 0;
  color: ${props => props.color};
  display: inline-flex;
  width: 20rem;
  height: 5rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  user-select: none;
  position: relative;
  background: ${props => props.background};
  border-width: 0.2rem;
  border-style: solid;
  border-color: ${props => props.background};
  border-image: initial;
  overflow: hidden;
  transition: border 200ms, background 200ms, color 200ms ease-out;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${props => props.hoverColor};
    border-color: ${props => props.hoverColor};
    border-image: initial;
    background: ${props => props.hoverBackground};
  }
`;

const Button = ({
  text,
  link,
  color,
  background,
  hoverColor,
  hoverBackground,
}) => (
  <Link href={link} prefetch passHref>
    <StyledLink
      background={background}
      hoverBackground={hoverBackground}
      hoverColor={hoverColor}
      color={color}
    >
      {text}
    </StyledLink>
  </Link>
);

Button.defaultProps = {
  color: 'white',
  background: 'black',
  hoverColor: 'white',
  hoverBackground: 'transparent',
};
Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  link: PropTypes.string.isRequired,
  color: PropTypes.string,
  background: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverBackground: PropTypes.string,
};

export default Button;
