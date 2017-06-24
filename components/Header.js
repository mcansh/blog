import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { H2 } from './post/Heading';

function buttonLink(slug) {
  if (!slug || slug === '') return;

  return (
    <div>
      <Link preload href={slug}>
        <a>Read More</a>
      </Link>
      <style jsx>{`
        a {
          color: currentcolor;
          text-decoration: none;
          transition: 300ms all ease-in-out;
          position: relative;
          will-change: auto;
        }

        a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          height: 1px;
          border-radius: 1px;
          width: 100%;
          background: currentcolor;
        }

        a:hover {
          color: #777;
          padding: 0 20px;
        }
      `}</style>
    </div>
  );
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blur: 'blur(0px)' };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  handleScroll() {
    const scroll = window.pageYOffset;
    const maxMinBlur = Math.min(100, Math.max(0, scroll / 3));
    const blur = `blur(${maxMinBlur}px)`;
    this.setState({ blur });
  }
  render() {
    const Date = this.props.date ? <H2>{this.props.date}</H2> : '';
    const blurStyles = {
      backdropFilter: `${this.state.blur}`,
      WebkitBackdropFilter: `${this.state.blur}`
    };
    return (
      <header>
        <div className="header__bg" style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.74902), rgba(0, 0, 0, 0.74902)), url(/static/images/${this.props.image})` }} />
        <div className="header__content" style={blurStyles}>
          <h1>{this.props.text}</h1>
          {buttonLink(this.props.slug)}
          {Date}
        </div>
        <style jsx>{`
          header {
            height: 50vh;
            min-height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            font-size: 1.7em;
            text-align: center;
          }

          .header__bg {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-position: center;
            background-size: cover;
          }

          .header__content {
            color: white;
            z-index: 1;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          @supports (backdrop-filter: initial) and (-webkit-backdrop-filter: initial) {
            .header_content {
              will-change: backdrop-filter;
              will-change: webkit-backdrop-filter;
            }
          }

          h1, h2 {
            max-width: 80%;
          }

          @media (max-width: 410px) {
            h1,h2 {
              max-width: 90%;
            }
            h1 {
              font-size: 1.5em;
            }
          }

          @media (max-height: 500px) {
            header {
              height: 100vh;
              min-height: 100vh;
            }
          }

          @media (max-width: 500px) {
            header {
              min-height: 95vh;
              height: 95vh;
            }
          }
        `}</style>
      </header>
    );
  }
}

Header.defaultProps = {
  date: '',
  slug: ''
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string,
  slug: PropTypes.string
};


export default Header;
