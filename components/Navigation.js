import React from 'react';
import Link from 'next/link';
import Hamburger from './Hamburger';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.onClick = this.toggleClass.bind(this);
  }

  toggleClass() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <nav className={this.state.open ? 'open' : ''}>
        <ul>
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href={`http://github.com/${process.env.GITHUB}`}><a>GitHub</a></Link></li>
          <li><Link href={`http://twitter.com/${process.env.TWITTER}`}><a>Twitter</a></Link></li>
        </ul>
        <Hamburger onClick={this.onClick} open={this.state.open} />
        <style jsx>{`
          ul {
            height: 100vh;
            max-width: 400px;
            width: 95%;
            position: fixed;
            background: black;
            top: 0;
            left: 0;
            z-index: 3;
            list-style: none;
            margin: 0;
            padding: 0;
            transform: translate3d(-100vw, 0, 0);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: 500ms all ease-in-out;
            box-shadow: 4px 0 15px 3px rgba(0, 0, 0, 0.4);
            will-change: transform;
          }

          li {
            margin: 10px 0;
            color: white;
          }

          li > a {
            color: currentcolor;
            text-decoration: none;
            font-size: 2.35em;
          }

          li > a:hover {
            color: rgba(255, 255, 255, 0.6)
          }

          nav.open ul {
            transform: none;
          }
        `}</style>
      </nav>
    );
  }
}

export default Navigation;
