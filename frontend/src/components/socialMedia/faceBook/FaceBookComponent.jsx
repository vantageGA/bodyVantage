import React from 'react';
import '../socialMedia.scss';
import FB from '../../../assets/icons/facebook-logo.jpg';

const FaceBookComponent = ({ faceBookUserName }) => {
  return (
    <>
      <div className="social-media-wrapper">
        <a
          href={`https://www.facebook.com/${faceBookUserName}`}
          target="_blank"
          rel="noreferrer"
        >
          <img className="social-media-icons size" src={FB} alt="Facebook" />
        </a>
      </div>
    </>
  );
};

export default FaceBookComponent;
