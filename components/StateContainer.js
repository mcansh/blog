import { Container } from 'unstated';

class StateContainer extends Container {
  state = { navOpen: false };

  toggleNav = () => {
    this.setState({ navOpen: !this.state.navOpen });
  };

  closeNav = () => {
    this.setState({ navOpen: false });
  };
}

export default StateContainer;
