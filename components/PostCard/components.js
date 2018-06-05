import styled from 'styled-components';

export const Post = styled.a`
  background: white;
  display: inline-block;
  width: calc(33.3333% - 2rem);
  height: 40rem;
  padding: 0;
  margin: 0 1rem 2rem 1rem;
  overflow: hidden;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05);
  vertical-align: top;
  transition: all 300ms ease-in-out;
  line-height: 1.6;
  font-size: 1.6rem;
  text-decoration: none;
  color: #555;
  position: relative;
  border-radius: 0.4rem;

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
    box-shadow: 0 0.2rem 2rem rgba(0, 0, 0, 0.18);
  }
`;

export const ImageWrap = styled.div`
  height: 50%;
  overflow: hidden;
`;

export const Meta = styled.div`
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: 50%;
`;

export const Title = styled.h1`
  font-weight: inherit;
  font-size: inherit;
  margin: 0;
`;

export const PostDate = styled.p`
  font-weight: inherit;
  font-size: inherit;
  margin: 0;
  padding: 1rem 0;
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
  transition: all 100ms linear;
  object-fit: cover;
`;
