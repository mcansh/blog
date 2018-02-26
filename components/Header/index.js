import React from 'react';
import PropTypes from 'prop-types';
import findPost from '../../utils/findPost';
import Button from '../Button';
import Image from '../Header/Image';
import Date from '../Header/Date';

const Header = props => {
  const post = findPost(props.id);
  const { title, date } = post;
  return (
    <header>
      <div>
        <h1>{props.title || title}</h1>
        {!props.link && date && <Date date={date} />}
        {props.link && <Button text="Read More" link={props.id} />}
      </div>
      <Image post={post} />
      <style jsx>{`
        header {
          height: 50vh;
          min-height: 50rem;
          max-height: 80rem;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          position: relative;
        }

        div {
          z-index: 1;
          text-align: center;
          max-width: 80vw;
        }

        h1 {
          font-size: 5rem;
          margin-bottom: 2rem;
        }
      `}</style>
    </header>
  );
};

Header.defaultProps = {
  link: null,
  id: null,
  title: null,
};

Header.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  id: PropTypes.string,
};

export default Header;
