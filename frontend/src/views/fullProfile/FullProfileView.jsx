import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './FullProfileView.scss';

import { profileByIdAction } from '../../store/actions/profileActions';
import { userReviewIdAction } from '../../store/actions/userReviewActions';

import Message from '../../components/message/Message';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import LinkComp from '../../components/linkComp/LinkComp';
import Rating from '../../components/rating/Rating';
import Review from '../../components/review/Review';

import moment from 'moment';

const FullProfileView = () => {
  const [divHeight, setDivHeight] = useState(0);
  const [nameHeight, setNameHeight] = useState(0);
  const ref = useRef(null);
  const refName = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const profileState = useSelector((state) => state.profileById);
  const { loading, error, profile } = profileState;

  useEffect(() => {
    dispatch(profileByIdAction(id));
    dispatch(userReviewIdAction(profile?.user));
    setDivHeight(ref.current.offsetHeight);
    setNameHeight(refName.current.offsetHeight);
    return () => {
      console.log('Full Profile cleanup');
    };
  }, [dispatch, id, profile?.user]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {error ? (
            <Message message={error} />
          ) : (
            <>
              <div className="full-profile-wrapper">
                <div
                  ref={ref}
                  className="item bg-image"
                  style={{
                    backgroundImage: `url(../uploads/profiles/${profile?.profileImage})`,
                  }}
                >
                  <div className="specialisation-wrapper">
                    <div className="specialisation">
                      {profile?.specialisationOne}
                    </div>
                    <div className="specialisation">
                      {profile?.specialisationTwo}
                    </div>
                    <div className="specialisation">
                      {profile?.specialisationThree}
                    </div>
                    <div className="specialisation">
                      {profile?.specialisationFour}
                    </div>
                  </div>
                  <div ref={refName}>
                    <div className="full-profile-name">{profile?.name}</div>
                    <Rating
                      value={profile?.rating}
                      text={`  from ${profile?.numReviews} reviews`}
                    />
                  </div>

                  <div
                    className="full-profile-time"
                    style={{ bottom: `-${divHeight - nameHeight * 2}px` }}
                  >
                    <p>
                      Profile last updated:{' '}
                      {moment(profile?.updatedAt).fromNow()}
                    </p>
                    <p>Create: {moment(profile?.createdAt).fromNow()}</p>
                  </div>
                </div>

                <div className="item">
                  <div className="specialisation-wrapper">
                    <div className="specialisation">
                      {profile?.specialisationOne}
                    </div>
                    <div className="specialisation">
                      {profile?.specialisationTwo}
                    </div>
                    <div className="specialisation">
                      {profile?.specialisationThree}
                    </div>
                    <div className="specialisation">
                      {profile?.specialisationFour}
                    </div>
                  </div>

                  <h1>My BIO</h1>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: profile?.description,
                    }}
                  ></p>

                  <h1>Specialisation</h1>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: profile?.specialisation,
                    }}
                  ></p>

                  <h1>Qualifications</h1>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: profile?.qualifications,
                    }}
                  ></p>

                  <div className="verified">
                    <h3>Qualifications Verified</h3>

                    {profile?.isQualificationsVerified === true ? (
                      <i
                        className="fa fa-check"
                        style={{
                          fontSize: 20 + 'px',
                          color: 'rgba(92, 184, 92, 1)',
                          marginLeft: 12 + 'px',
                        }}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-times"
                        style={{
                          fontSize: 20 + 'px',
                          color: 'crimson',
                          marginLeft: 12 + 'px',
                        }}
                      ></i>
                    )}
                  </div>
                </div>

                <div className="item">
                  <div className="specialisation-wrapper">
                    <div className="specialisation">
                      {profile?.specialisationOne}
                    </div>
                    <div className="specialisation">
                      {profile?.specialisationTwo}
                    </div>
                    <div className="specialisation">
                      {profile?.specialisationThree}
                    </div>
                    <div className="specialisation">
                      {profile?.specialisationFour}
                    </div>
                  </div>

                  <div>
                    {profile?.reviews.length > 0 ? (
                      <>
                        <h1>Reviews</h1>
                        {profile.reviews.map((review) => (
                          <div key={review._id}>
                            <Review
                              reviewer={
                                review.showName ? review.name : 'ANONYMOUS'
                              }
                              review={review.comment}
                              reviewedOn={moment(review.createdAt).fromNow()}
                            />
                          </div>
                        ))}
                        <Rating
                          value={profile?.rating}
                          text={`  from ${profile?.numReviews} reviews`}
                        />
                        <LinkComp
                          route="reviewer-login"
                          routeName={`Write a review about ${profile?.name}`}
                        />
                      </>
                    ) : (
                      <>
                        <h1>Reviews</h1>
                        <p>
                          There is currently no reviews for {profile?.name}.
                        </p>
                        <p>
                          Be the first to review {profile?.name} by
                          <LinkComp
                            route="reviewer-login"
                            routeName={` clicking here`}
                          />
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    <h1>Contact Details</h1>
                    <p>Mobile number: {profile?.telephoneNumber}</p>
                    <p>
                      email:{' '}
                      <a
                        href={`mailto: ${profile?.email}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {profile?.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <h1>Location</h1>
                    <p>{profile?.location}</p>
                  </div>
                </div>
              </div>
            </>
          )}
          <LinkComp route="" routeName="GO BACK" />
        </>
      )}
    </div>
  );
};

export default FullProfileView;
