import React, { useEffect } from 'react';
import './Card.scss';
import { Link } from 'react-router-dom';
import Rating from '../rating/Rating';
import Button from '../button/Button';

import { profileByIdAction } from '../../store/actions/profileActions';
import { profileClickCounterAction } from '../../store/actions/profileActions';
import { useDispatch, useSelector } from 'react-redux';

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
  profileClickCounter,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileByIdAction(id));
    return () => {
      // console.log('Full Profile cleanup');
    };
  }, [dispatch, id]);

  const profilesState = useSelector((state) => state.profiles);
  const { profiles } = profilesState;

  // const [profileClickCounter] = useState(profile?.profileClickCounter);
  const handleProfileClickCounter = (_id, count) => {
    profiles.filter((profile) => {
      if (profile._id === _id) {
        dispatch(profileClickCounterAction(_id, count));
      }
      return profile;
    });
  };

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
          {profileClickCounter}
          <Link className="link" to={`/fullProfile/${id}`}>
            <Button
              colour="transparent"
              text="VIEW FULL PROFILE"
              className="btn link"
              disabled={false}
              onClick={() => handleProfileClickCounter(id, 1)}
            ></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
