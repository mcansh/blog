import styled from 'styled-components';

const Nav = styled.nav<{ navOpen: boolean }>`
  &::after {
    content: '';
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    visibility: ${props => (props.navOpen ? 'visible' : 'hidden')};
    opacity: ${props => (props.navOpen ? 1 : 0)};
    transition: 500ms all ease-in-out;
    will-change: opacity;
  }

  ul {
    height: 100vh;
    max-width: 40rem;
    width: 95%;
    position: fixed;
    background: black;
    top: 0;
    left: 0;
    z-index: 3;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0.4rem 0 1.5rem 0.3rem rgba(0, 0, 0, 0.4);
    will-change: transform;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    li {
      margin: 1rem 0;
      color: white;

      a {
        color: currentcolor;
        text-decoration: none;
        font-size: 3rem;
        &:hover {
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;

export default Nav;
