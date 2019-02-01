import React from 'react';
import styled from 'styled-components';
import { Spring, animated } from 'react-spring';
import FindPost from '~/utils/findPost';
import Button from '~/components/Button';
import Image, { ImageTypes } from '~/components/Header/Image';
import Date from '~/components/Header/Date';
import Curve from '~/components/icons/curve.svg';

const HeaderStyles = styled.header.attrs({ 'data-testid': 'header' })`
  height: 50vh;
  min-height: 50rem;
  max-height: 80rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;

  @media (orientation: landscape) and (max-height: 500px) {
    max-height: 100vh;
    min-height: 100vh;
    height: 100vh;
  }

  figure {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(50%);
    width: 100%;
    svg {
      fill: ${props => props.theme.background};
    }
  }
`;

const HeaderContent = styled.div`
  z-index: 1;
  text-align: center;
  max-width: 80vw;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 3rem;

  @media (min-width: 400px) {
    font-size: 4rem;
  }
`;

const AnimatedTitle = animated(Title);

interface Props {
  title?: string | null;
  link?: string | null;
  id?: string | null;
  image?: ImageTypes | null;
}

const Header = ({ image, title, link, id }: Props) => (
  <FindPost id={id}>
    {post => {
      const headerTitle = title != null ? title : post.title;
      const headerImage = image != null ? image : post.image;
      const showDate = link == null && post && post.date;
      const showLink = link != null && post && post.id;
      return (
        <HeaderStyles>
          <HeaderContent>
            <Spring
              native
              from={{ opacity: 0, transform: 'translateY(-50px)' }}
              to={{ opacity: 1, transform: 'translateY(0px)' }}
            >
              {props => (
                <AnimatedTitle style={props}>{headerTitle}</AnimatedTitle>
              )}
            </Spring>
            {showDate && <Date date={post.date} />}
            {showLink && <Button text="Read More" link={post.id} />}
          </HeaderContent>
          <Image image={headerImage} />
          <figure>
            <Curve />
          </figure>
        </HeaderStyles>
      );
    }}
  </FindPost>
);

Header.defaultProps = {
  link: null,
  id: null,
  title: null,
  image: null,
};

export default Header;
