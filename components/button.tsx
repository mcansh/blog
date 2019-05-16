import { UrlObject } from 'url';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface Props
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  text: string;
  link: string | UrlObject;
  textColor?: string;
  background?: string;
  hoverTextColor?: string;
  hoverBackground?: string;
}

type StyledLinkProps = Pick<
  Props,
  'textColor' | 'background' | 'hoverTextColor' | 'hoverBackground'
>;

const StyledLink = styled.a<StyledLinkProps>`
  margin: 3rem 0 0 0;
  color: ${props => props.textColor};
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
    color: ${props => props.hoverTextColor};
    border-color: ${props => props.hoverTextColor};
    border-image: initial;
    background: ${props => props.hoverBackground};
  }
`;

const Button = ({
  text,
  link,
  textColor,
  background,
  hoverTextColor,
  hoverBackground,
}: Props) => {
  return (
    <Link href={link} passHref>
      <StyledLink
        background={background}
        hoverBackground={hoverBackground}
        hoverTextColor={hoverTextColor}
        textColor={textColor}
      >
        {text}
      </StyledLink>
    </Link>
  );
};

Button.defaultProps = {
  textColor: 'white',
  background: 'black',
  hoverTextColor: 'white',
  hoverBackground: 'transparent',
};

export default Button;
