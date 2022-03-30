import React from 'react';
import PropTypes from 'prop-types';
import './Review.scss';

const Review = ({ reviewer, review, reviewedOn }) => {
  return (
    <>
      <div className="review-wrapper">
        <p>
          Here's what <span className="reviewer">{reviewer}</span> said{' '}
          <span className="reviewer">{reviewedOn}</span>.
        </p>
        <div className="tagline">{review}</div>
      </div>
      <hr className="style-one" />
    </>
  );
};

Review.propTypes = {
  reviewer: PropTypes.string,
  review: PropTypes.string,
  reviewedOn: PropTypes.string,
};

export default Review;
