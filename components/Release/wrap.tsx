import styled from 'styled-components';

const ReleaseWrap = styled.div`
  margin: 2rem;
  @media (min-width: 500px) {
    margin: 2rem 4rem;
  }

  time {
    font-size: 1.6rem;
    font-weight: 600;
    margin: 1rem 0;
    display: block;
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.4rem;
  }
`;

export default ReleaseWrap;
