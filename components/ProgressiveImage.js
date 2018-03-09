import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.img`
  height: 100%;
  width: 100%;
  ${props => (props.loading ? 'filter: blur(10px)' : '')};
  ${props => (props.loading ? 'transform: scale(1.03);' : '')};
  ${props => (props.loading ? 'overflow: hidden' : '')};
  transition: all 100ms linear;
  object-fit: cover;
`;

class ProgressiveImage extends Component {
  static propTypes = {
    placeholder: PropTypes.shape({
      webp: PropTypes.string,
      fallback: PropTypes.string,
    }).isRequired,
    source: PropTypes.shape({
      webp: PropTypes.string,
      fallback: PropTypes.string,
    }).isRequired,
    mimeType: PropTypes.string,
    alt: PropTypes.string,
  };

  static defaultProps = {
    mimeType: 'image/jpg',
    alt: '',
  };

  state = {
    loading: true,
  };

  componentDidMount = () => {
    this.setState({ loading: false });
  };

  render() {
    const { placeholder, source, mimeType, ...props } = this.props;
    const { loading } = this.state;
    return (
      <picture>
        <source
          srcSet={loading ? placeholder.webp : source.webp}
          type="image/webp"
        />
        <source
          srcSet={loading ? placeholder.fallback : source.fallback}
          type={mimeType}
        />
        <Image
          loading={loading}
          src={loading ? placeholder.fallback : source.fallback}
          {...props}
        />
      </picture>
    );
  }
}

export default ProgressiveImage;
