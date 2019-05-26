import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import { useTransition, animated } from 'react-spring';

import Nav from '~/components/styles/navigation';
import Hamburger from '~/components/hamburger';
import isAbsoluteUrl from 'is-absolute-url';
import Link from 'next/link';

import { navigationLinks } from '~/config';
import linkAttributes from '~/utils/link-attributes';

const Navigation = () => {
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => {
    setNavOpen(false);
  };

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      clearAllBodyScrollLocks();
      closeNav();
    });

    return () => {
      Router.events.off('routeChangeComplete', () => {
        clearAllBodyScrollLocks();
        closeNav();
      });
    };
  });

  const toggleNav = () => {
    setNavOpen(old => {
      if (old) {
        enableBodyScroll(document.body);
      } else {
        disableBodyScroll(document.body);
      }
      return !old;
    });
  };

  const tranitions = useTransition(navOpen, null, {
    from: { transform: 'translate3d(-105%, 0, 0)' },
    enter: { transform: 'translate3d(0, 0, 0)' },
    leave: { transform: 'translate3d(-105%, 0, 0)' },
    reset: true,
    unique: true,
  });

  return (
    <Nav
      navOpen={navOpen}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key.toLowerCase() === 'escape') {
          closeNav();
        }
      }}
    >
      <Hamburger onClick={toggleNav} navOpen={navOpen} />

      {tranitions.map(({ item, key, props }) => {
        return (
          item && (
            <animated.ul key={key} style={props}>
              {navigationLinks.map(({ name, slug }) => {
                const isExternal = isAbsoluteUrl(slug);
                return (
                  <li key={name}>
                    <Link href={slug}>
                      <a {...linkAttributes(isExternal)}>{name}</a>
                    </Link>
                  </li>
                );
              })}
            </animated.ul>
          )
        );
      })}
    </Nav>
  );
};

export default Navigation;
