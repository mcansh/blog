import React from 'react';
import Router, { useRouter } from 'next/router';
import { useAmp } from 'next/amp';
import styled from 'styled-components';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import Link from '~/components/link';
import NavList, { NavLinks } from '~/components/nav-list';
import Hamburger from '~/components/hamburger';
import Portal from '~/components/portal';

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
  }
`;

const Navigation: React.FC = () => {
  const isAmp = useAmp();
  const {
    query: { amp, ...query },
  } = useRouter();

  const [navOpen, setNavOpen] = React.useState(false);
  const closeNav = () => setNavOpen(false);

  React.useEffect(() => {
    const closeNavAndEnableScroll = () => {
      clearAllBodyScrollLocks();
      closeNav();
    };

    Router.events.on('routeChangeComplete', closeNavAndEnableScroll);

    return () => {
      Router.events.off('routeChangeComplete', closeNavAndEnableScroll);
    };
  });

  const onClick = () => {
    setNavOpen(old => {
      if (old) {
        enableBodyScroll(document.body);
      } else {
        disableBodyScroll(document.body);
      }
      return !old;
    });
  };

  return isAmp ? (
    <ul
      css={`
        display: flex;
        flex-flow: row wrap;
        list-style: none;
        padding: 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        justify-content: center;
        width: 100%;
        @media (max-width: 403px) {
          width: 75%;
          margin: 0 12.5%;
        }

        li {
          margin: 1rem;
        }

        a {
          color: white;
          text-decoration: none;
          font-size: 1.4rem;
          &:hover {
            color: var(--primary);
          }
        }
      `}
    >
      {NavLinks.map(link => (
        <li key={link.name}>
          <Link
            href={{
              pathname: link.slug,
              query: isAmp ? { ...query, amp: 1 } : query,
            }}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <Nav
      navOpen={navOpen}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key.toLowerCase() === 'escape') {
          closeNav();
        }
      }}
    >
      <Hamburger onClick={onClick} navOpen={navOpen} />
      <Portal>
        <NavList navOpen={navOpen} />
      </Portal>
    </Nav>
  );
};

export default Navigation;
