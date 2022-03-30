import React from 'react';
import './Card.scss';
import { Link } from 'react-router-dom';
import Rating from '../rating/Rating';
import Button from '../button/Button';

const Card = ({
  id,
  name,
  src,
  alt,
  description,
  location,
  email,
  telephoneNumber,
  specialisation,
  qualifications,
  isQualificationsVerified,
  rating,
  reviews,
  specialisationOne,
  specialisationTwo,
  specialisationThree,
  specialisationFour,
}) => {
  return (
    <div className="card-inner-wrapper">
      <div className="item">
        <div className="specialisation">{specialisationOne}</div>
        <div className="specialisation">{specialisationTwo}</div>
        <div className="specialisation">{specialisationThree}</div>
        <div className="specialisation">{specialisationFour}</div>
      </div>

      <div className="item">
        <img
          className="card-profile-image"
          src={src}
          alt={alt}
          loading="lazy"
        />
        <div>
          <div className="card-name">{name}</div>
          <Rating value={rating} text={`  from ${reviews} reviews`} />

          {specialisation}
          {description}
          {location}
          {isQualificationsVerified}
          {qualifications}
          {email}
          {telephoneNumber}

          <Link className="link" to={`/fullProfile/${id}`}>
            <Button
              colour="transparent"
              text="VIEW FULL PROFILE"
              className="btn link"
              disabled={false}
            ></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
