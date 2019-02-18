import styled from 'styled-components';

const PostsWrapper = styled.div`
  margin: 0 auto;
  width: 95%;
  padding-top: 9rem;
  display: flex;
  flex-flow: row wrap;

  @supports (display: grid) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
    grid-gap: 3.6rem;
  }

  @media (min-width: 768px) {
    max-width: 750px;
    width: auto;
  }

  @media (min-width: 992px) {
    max-width: 970px;
    width: auto;
  }

  @media (min-width: 1200px) {
    max-width: 1170px;
    width: auto;
  }
`;

export default PostsWrapper;
