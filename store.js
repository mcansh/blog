import createStore from 'unistore';

export const store = createStore({ navOpen: false });

export const actions = () => ({
  toggleNav: ({ navOpen }) => ({ navOpen: !navOpen }),
});
