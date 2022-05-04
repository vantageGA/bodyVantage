import React from 'react';
import '../socialMedia.scss';
import Instagram from '../../../assets/icons/Instagram_icon.png';

export const InstagramComponent = ({ instagramUserName }) => {
  return (
    <>
      <div className="social-media-wrapper">
        <a
          href={`https://www.instagram.com/${instagramUserName}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="social-media-icons size"
            src={Instagram}
            alt="Facebook"
          />
        </a>
      </div>
    </>
  );
};
export default InstagramComponent;
