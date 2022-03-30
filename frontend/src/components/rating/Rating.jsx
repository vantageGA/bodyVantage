import React from 'react';
import './Rating.scss';
import PropTypes from 'prop-types';

const Rating = ({ value, text, colour, fontSize }) => {
  return (
    <div className="rating">
      <span>
        <i
          style={{ color: colour, fontSize: fontSize }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color: colour, fontSize: fontSize }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color: colour, fontSize: fontSize }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color: colour, fontSize: fontSize }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color: colour, fontSize: fontSize }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span className="small-text">{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  colour: 'orange',
  fontSize: '12px',
};

Rating.prototype = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  colour: PropTypes.string,
  fontSize: PropTypes.string,
};

export default Rating;
