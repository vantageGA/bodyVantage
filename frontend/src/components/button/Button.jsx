import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ colour, text, disabled, title, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ backgroundColor: colour }}
      className={disabled ? 'btn disabled' : 'btn not-disabled'}
      title={title}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  colour: 'yellow',
  disabled: true,
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  colour: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
