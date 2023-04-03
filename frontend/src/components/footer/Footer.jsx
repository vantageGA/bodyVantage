import React from 'react';
import './Footer.scss';
import DateTime from '../dateTime/DateTime';

const Footer = () => {
  return (
    <footer>
      <fieldset className="fieldSet">
        <div className="footer-wrapper">
          <DateTime />
          <div>CopyRight &copy; Body-Vantage</div>
        </div>
      </fieldset>
    </footer>
  );
};

export default Footer;
