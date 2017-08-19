import React from 'react';

class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0 };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  handleScroll() {
    const scroll = window.pageYOffset; // window.scrollY is less supported
    const bodyHeight = document.body.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollPercent = (scroll / (bodyHeight - windowHeight)) * 100;
    const maxMinscroll = Math.min(100, Math.max(0, scrollPercent));
    this.setState({ progress: maxMinscroll });
  }
  render() {
    return (
      <progress value={this.state.progress} max="100">
        <style jsx>{`
          progress::-webkit-progress-bar {
            background-color: transparent;
          }

          progress::-webkit-progress-value {
            background-image: linear-gradient(135deg, #52E5E7 0%, #130CB7 100%);
          }

          progress::-moz-progress-bar {
            background-image: linear-gradient(135deg, #52E5E7 0%, #130CB7 100%);
          }

          progress {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            z-index: 2;
            width: 100%;
            height: 2px;
            appearance: none;
          }
        `}</style>
      </progress>
    );
  }
}

export default Progress;
