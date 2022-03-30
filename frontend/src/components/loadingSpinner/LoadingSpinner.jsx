import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="loading">
      <div className="arc"></div>
      <div className="arc"></div>
      <div className="arc"></div>
    </div>
  );
};

export default LoadingSpinner;
