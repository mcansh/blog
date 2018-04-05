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
    image: {
      webp: this.props.placeholder.webp,
      fallback: this.props.placeholder.fallback,
    },
  };

  componentDidMount = async () => {
    this.loadRealImage(await this.supportsWebp());
  };

  supportsWebp = async () => {
    if (!window.self.createImageBitmap) return false;

    const webpData =
      'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    const blob = await fetch(webpData).then(r => r.blob());
    return createImageBitmap(blob).then(() => true, () => false);
  };

  arrayBufferToBase64 = buffer => {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach(b => (binary += String.fromCharCode(b)));

    return window.btoa(binary);
  };

  loadRealImage = async supportsWebp => {
    const { source } = this.props;
    const base64Flag = `data:image/${supportsWebp ? 'webp' : 'jpeg'};base64,`;

    if (supportsWebp) {
      const imagePromise = await fetch(source.fallback);
      const buffer = await imagePromise.arrayBuffer();

      const imageStr = this.arrayBufferToBase64(buffer);

      this.setState(state => ({
        loading: false,
        image: {
          ...state.image,
          webp: base64Flag + imageStr,
        },
      }));
    } else {
      const imagePromise = await fetch(source.fallback);
      const buffer = await imagePromise.arrayBuffer();

      const imageStr = this.arrayBufferToBase64(buffer);

      this.setState(state => ({
        loading: false,
        image: {
          ...state.image,
          fallback: base64Flag + imageStr,
        },
      }));
    }
  };

  render() {
    const { placeholder, source, mimeType, ...props } = this.props;
    const { loading, image } = this.state;
    return (
      <picture>
        <source srcSet={image.webp} type="image/webp" />
        <source srcSet={image.fallback} type={mimeType} />
        <Image loading={loading} src={image.fallback} {...props} />
      </picture>
    );
  }
}

export default ProgressiveImage;
