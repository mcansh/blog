import React from 'react';
import MenuButton from '~/components/styles/hamburger';

interface Props {
  navOpen: boolean;
  onClick: () => void;
}

const Hamburger = ({ navOpen, onClick }: Props) => (
  <MenuButton
    aria-label={`${navOpen ? 'Close' : 'Open'} Side Nav`}
    onClick={onClick}
    open={navOpen}
  >
    <span />
  </MenuButton>
);

export default Hamburger;
