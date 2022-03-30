import React from 'react';
import './Footer.scss';
import DateTime from '../dateTime/DateTime';

const Footer = () => {
  return (
    <footer>
      <fieldset className="fieldSet">
        <div className="footer-wrapper">
          <div>Developed by Gary Allin</div>
          <div>CopyRight &copy; Check-A-Sport</div>
        </div>
        <div className="date-time">
          <DateTime />
        </div>
      </fieldset>
    </footer>
  );
};

export default Footer;
