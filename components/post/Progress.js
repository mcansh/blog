import React from 'react';

const Progress = () => (
  <progress value="0" max="100">
    <style jsx>{`
      progress::-webkit-progress-bar {
        background-color: transparent;
      }

      progress::-webkit-progress-value {
        background-color: #E53A40;
      }

      progress::-moz-progress-bar {
        background-color: #E53A40;
      }

      progress {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 3px;
        appearance: none;
      }
    `}</style>
  </progress>
);

export default Progress;
