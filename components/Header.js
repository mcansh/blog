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
          z-index: 1
        }
      `}</style>
    </header>
  );
};

Header.defaultProps = {
  date: ''
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default Header;
