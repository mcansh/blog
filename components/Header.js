import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  const Date = props.date ? <h2>{props.date}</h2> : '';
  return (
    <header>
      <div className="header__bg" style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.74902), rgba(0, 0, 0, 0.74902)), url(/static/images/${props.image_url})` }} />
      <div className="header__content">
        <h1>{props.text}</h1>
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
          backdrop-filter: blur(0px);
          will-change: backdrop-filter;
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

        @media (max-width: 550px) {

        }

        @media (max-width: 500px) {
          header {
            min-height: 95vh;
            height: auto;
          }
        }
      `}</style>
    </header>
  );
};

Header.defaultProps = {
  date: '',
  image_url: 'wesson-wang-110739.jpg'
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  image_url: PropTypes.string.isNotRequired,
  date: PropTypes.string.isRequired
};

export default Header;
