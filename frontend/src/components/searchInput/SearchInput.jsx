import React from 'react';
import './SearchInput.scss';
import PropTypes from 'prop-types';

const SearchInput = ({
  type,
  placeholder,
  handleSearch,
  className,
  value,
  label,
}) => {
  return (
    <>
      <div className="search-input-wrapper">
        <input
          type={type}
          className={className}
          placeholder={placeholder}
          onChange={handleSearch}
          value={value}
          multiple
          required
        />
        {/* <span className="highlight"></span> */}
        <span className="bar"></span>
        <label>{label}</label>
      </div>
    </>
  );
};

SearchInput.defaultProps = {
  type: 'search',
};

SearchInput.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchInput;
