import styled from 'styled-components';

const imageHeight = 200;

const PostCard = styled.a.attrs({
  className: 'post-card',
  'data-testid': 'post-link',
})`
  background: white;
  width: calc(33.3333% - 2rem);
  padding: 0;
  margin: 0 1rem 2rem 1rem;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0.3rem 0.8rem 0;
  transition-property: all;
  transition-duration: 200ms;
  transition-timing-function: ease;
  text-decoration: none;
  position: relative;
  border-radius: 0.5rem;
  cursor: pointer;

  @media (prefers-color-scheme: dark) {
    background: #313639;
  }

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

  .post-card__meta {
    padding: 1.8rem 1.8rem 2.7rem 1.8rem;
  }

  .post-card__title {
    font-weight: 700;
    font-size: 2.2rem;
    margin: 0 0 1.1rem;
    color: #262626;

    @media (prefers-color-scheme: dark) {
      color: var(--text);
    }
  }

  .post-card__date {
    font-weight: 400;
    color: #666666;
    font-size: 1.62rem;
    margin: 0;

    @media (prefers-color-scheme: dark) {
      color: #d4d4d4;
    }
  }

  .post-card__img-wrapper {
    overflow: hidden;
    height: 200px;
    img {
      height: 100%;
      width: 100%;
      transition-property: all;
      transition-duration: 1s;
      transition-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
      object-fit: cover;
    }
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0 0.8rem 2.4rem 0;
    .post-card__title {
      text-decoration: underline;
    }
  }
`;

export { imageHeight };
export default PostCard;
