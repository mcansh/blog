import styled from 'styled-components';

export const ImageWrap = styled.div`
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    transition: all 1s;
    object-fit: cover;
  }
`;

export const Meta = styled.div`
  height: 50%;
  padding: 1.8rem 1.8rem 2.7rem 1.8rem;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 2.2rem;
  margin: 0 0 1.1rem;
  color: #262626;
`;

export const PostDate = styled.p`
  font-weight: 400;
  color: #666666;
  font-size: 1.62rem;
  margin: 0;
`;

export const Post = styled.a.attrs({ className: 'postcard' })`
  background: white;
  display: inline-flex;
  flex-direction: column;
  width: calc(33.3333% - 2rem);
  padding: 0;
  margin: 0 1rem 2rem 1rem;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0.3rem 0.8rem 0;
  transition: all 200ms ease;
  text-decoration: none;
  color: #262626;
  position: relative;
  border-radius: 0.5rem;
  cursor: pointer;

  @media (max-width: 999px) {
    width: calc(50% - 2rem);
  }

  @media (max-width: 650px) {
    width: 100%;
    margin: 0 0 2rem 0;
  }

  @supports (display: grid) {
    width: 100%;
    margin: 0;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0 0.8rem 2.4rem 0;
    ${Title} {
      text-decoration: underline;
    }
    ${ImageWrap} img {
      transform: scale(2);
      transition-duration: 10s;
    }
  }
`;
