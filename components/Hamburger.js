// @flow
import React from 'react';
import { defineMessages, injectIntl, type IntlShape } from 'react-intl';
import styled from 'styled-components';

const messages = defineMessages({
  navOpenLabel: {
    id: 'Hamburger.label.opened',
    defaultMessage: 'Close Side Nav',
  },
  navClosedLabel: {
    id: 'Hamburger.label.closed',
    defaultMessage: 'Open Side Nav',
  },
});

const MenuButton = styled.button`
  position: ${({ open }) => (open ? 'fixed' : 'absolute')};
  top: constant(safe-area-inset-top);
  top: env(safe-area-inset-top);
  top: 2rem;
  left: constant(safe-area-inset-left);
  left: env(safe-area-inset-left);
  left: 2rem;
  appearance: none;
  height: 4rem;
  width: 4rem;
  background: none;
  border: none;
  padding: 0;
  z-index: 4;
  cursor: pointer;
  overflow: hidden;

  @supports (padding: max(0rem)) {
    left: max(2rem, env(safe-area-inset-left));
    top: max(2rem, env(safe-area-inset-top));
  }
`;

const Lines = styled.span`
  width: 100%;
  height: 0.2rem;
  background: ${({ open }) => (open ? 'transparent' : 'white')};
  display: block;
  position: relative;
  border-radius: 0.5rem;
  transition-property: background;
  transition-timing-function: ${({ open }) => (open ? 'ease-in' : 'open')};
  transition-duration: ${({ open }) => (open ? '350ms' : '150ms')};
  left: 0;

  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 0.2rem;
    position: absolute;
    left: 0;
    background: white;
    border-radius: 0.5rem;
    transition: 150ms all ease;
    will-change: transform;
  }

  &::before {
    top: ${({ open }) => (open ? 0 : '-1rem')};
    transform: ${({ open }) => (open ? 'rotate(45deg)' : 'none')};
    transition-property: all;
    transition-timing-function: ${({ open }) => (open ? 'ease-in' : 'open')};
    transition-duration: ${({ open }) => (open ? '350ms' : '150ms')};
  }

  &::after {
    top: ${({ open }) => (open ? 0 : '1rem')};
    transition-property: all;
    transition-timing-function: ${({ open }) => (open ? 'ease-in' : 'open')};
    transition-duration: ${({ open }) => (open ? '350ms' : '150ms')};
    transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'none')};
  }
`;

type Props = {
  navOpen: boolean,
  onClick: () => void,
  intl: IntlShape,
};

const Hamburger = ({ intl: { formatMessage }, navOpen, onClick }: Props) => (
  <MenuButton
    aria-label={formatMessage(
      navOpen ? messages.navOpenLabel : messages.navClosedLabel
    )}
    onClick={onClick}
    open={navOpen}
  >
    <Lines open={navOpen} />
  </MenuButton>
);

export default injectIntl(Hamburger);
