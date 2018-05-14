import styled from 'styled-components';

export const Post = styled.a`
  background: white;
  display: inline-block;
  width: calc(33.3333% - 1rem);
  height: 40rem;
  padding: 0;
  margin: 0 0.5rem 1rem 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 1rem 0.4rem rgba(0, 0, 0, 0.02);
  vertical-align: top;
  transition: 200ms all ease-in-out;
  line-height: 1.6;
  font-size: 1.6rem;
  text-decoration: none;
  color: #555;

  @media (max-width: 999px) {
    width: calc(50% - 1rem);
  }

  @media (max-width: 650px) {
    width: 100%;
    margin: 0 0 1rem 0;
  }

  @supports (display: grid) {
    width: 100%;
    margin: 0;
  }

  &:hover {
    box-shadow: 0 0 1rem 0.4rem rgba(0, 0, 0, 0.2);
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
