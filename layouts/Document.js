import React from 'react';
import PropTypes from 'prop-types';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Document = ({ children }, props) => (
  <div>
    <Meta title={props.title} image={props.image} />
    <Navigation />
    <div>
      { children }
    </div>
    <style jsx>{`
      div {
        margin-bottom: 4em;
        background: #F7F7F7;
      }
    `}</style>
    <Footer />
    {/* <script src="/static/js/main.js" /> */}
  </div>
);

Document.defaultProps = {
  title: 'Logan McAnsh',
  image: 'https://avatars1.githubusercontent.com/u/11698668?v=3&amp;s=460'
};

Document.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  image: PropTypes.string
};

export default Document;
