import React from 'react';
import Link from 'next/link';
import Hamburger from './Hamburger';

const Navigation = () => (
  <nav>
    <ul>
      <li><Link href="/"><a>Home</a></Link></li>
      <li><Link href={`http://github.com/${process.env.GITHUB}`}><a>GitHub</a></Link></li>
      <li><Link href={`http://twitter.com/${process.env.TWITTER}`}><a>Twitter</a></Link></li>
    </ul>
    <Hamburger />
    <div className="overlay" />
    <style jsx>{`
      .overlay {
        background: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        visibility: hidden;
        opacity: 0;
        transition: 500ms all ease-in-out;
      }

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

      nav.open .overlay {
        visibility: visible;
        opacity: 1;
      }

      nav.open ul {
        transform: none;
      }
    `}</style>
  </nav>
);

export default Navigation;
