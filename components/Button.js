import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Button = ({ link, children }) => {
  if (!link || link === '') return null;
  // eslint-disable-next-line consistent-return
  return (
    <div>
      <Link prefetch href={link}>
        <a>
          {children}
          <span />
          <span />
        </a>
      </Link>
      <style jsx>{`
        a {
          position: relative;
          text-transform: uppercase;
          color: white;
          cursor: pointer;
          min-width: 300px;
          transition: all 200ms cubic-bezier(0.2, 0.3, 0.25, 0.9);
          background-color: transparent;
          padding: 1.2rem 1.5rem;
          margin-top: 10px;
          letter-spacing: 1px;
          line-height: 1.4;
          font-weight: 400;
          text-decoration: none;
          font-size: 1rem;
        }

        a:hover {
          color: white;
        }

        a:focus,
        a:active {
          background: white;
          color: black;
        }

        a::after {
          content: '';
          width: 80%;
          height: 1px;
          background: white;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translate3d(-50%, 0, 0);
          transition: width 200ms cubic-bezier(0.2, 0.3, 0.25, 0.9) 400ms,
            background 200ms cubic-bezier(0.2, 0.3, 0.25, 0.9) 0ms;
        }

        a:hover::after {
          width: 100%;
          background: white;
          transition: width 200ms cubic-bezier(0.2, 0.3, 0.25, 0.9) 0ms,
            background 200ms cubic-bezier(0.2, 0.3, 0.25, 0.9) 0ms;
        }

        span {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          transition: all 200ms cubic-bezier(0.2, 0.3, 0.25, 0.9);
          width: 100%;
        }

        span:before,
        span::after {
          content: '';
        }

        span:first-child {
          height: 100%;
        }

        span:first-child::before {
          left: 0;
        }

        span:first-child::after {
          right: 0;
        }

        span::before,
        span::after {
          content: '';
          display: block;
          position: absolute;
          background: white;
          transition: transform 200ms cubic-bezier(0.2, 0.3, 0.25, 0.9);
        }

        span:last-child {
          width: 100%;
          height: 1px;
        }

        span:last-child::before {
          left: 0;
          transform-origin: bottom left;
        }

        span:last-child::after {
          right: 0;
          transform-origin: bottom right;
        }

        span:first-child::before,
        span:first-child::after {
          width: 1px;
          height: 100%;
          bottom: 0;
          transform: scale3d(1, 0, 1);
          transform-origin: bottom center;
          transition: transform 200ms cubic-bezier(0.2, 0.3, 0.25, 0.9) 200ms,
            background 200ms cubic-bezier(0.2, 0.3, 0.25, 0.9) 0ms;
        }

        span:last-child::before,
        span:last-child::after {
          height: 1px;
          width: 100%;
          bottom: 0;
          transform: scale3d(0, 1, 0);
          transition: transform 0.2s cubic-bezier(0.2, 0.3, 0.25, 0.9) 0s,
            background 0.2s cubic-bezier(0.2, 0.3, 0.25, 0.9) 0s;
        }

        a:hover span:first-child::before,
        a:hover span:first-child::after {
          transform: scale3d(1, 1, 1);
          background: white;
          transition: transform 200ms cubic-bezier(0.2, 0.3, 0.25, 0.9) 200ms,
            background 200ms cubic-bezier(0.2, 0.3, 0.25, 0.9) 0ms;
        }

        a:hover span:last-child::before,
        a:hover span:last-child::after {
          transform: scale3d(1, 1, 1);
          background: white;
          transition: transform 200ms cubic-bezier(0.2, 0.3, 0.25, 0.9) 400ms,
            background 200ms cubic-bezier(0.2, 0.3, 0.25, 0.9) 0ms;
        }
      `}</style>
    </div>
  );
};

Button.defaultProps = {
  link: '',
  children: '',
};

Button.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
