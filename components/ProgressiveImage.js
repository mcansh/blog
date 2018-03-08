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
    placeholder: PropTypes.string.isRequired,
    full: PropTypes.string.isRequired,
    webpImage: PropTypes.string.isRequired,
    fullImage: PropTypes.string.isRequired,
    mimeType: PropTypes.string.isRequired,
  };

  state = {
    source: this.props.placeholder,
    loading: true,
  };

  componentDidMount = () => {
    this.setState({ source: this.props.full, loading: false });
  };

  render() {
    const { webpImage, fullImage, mimeType, ...props } = this.props;
    const { loading, source } = this.state;
    return (
      <picture>
        <source srcSet={webpImage} type="image/webp" />
        <source srcSet={fullImage} type={mimeType} />
        <Image loading={loading} src={source} {...props} />
      </picture>
    );
  }
}

export default ProgressiveImage;
