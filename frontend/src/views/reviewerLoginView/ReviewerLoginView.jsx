import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './ReviewerLoginView.scss';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import LinkComp from '../../components/linkComp/LinkComp';
import Rating from '../../components/rating/Rating';
import Review from '../../components/review/Review';

import {
  userReviewLoginAction,
  createUserReviewAction,
} from '../../store/actions/userReviewActions';

import moment from 'moment';

const ReviewerLoginView = () => {
  const dispatch = useDispatch();
  const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rating, setRating] = useState(5);
  let [showName, setShowName] = useState(false);
  const [comment, setComment] = useState('');

  const userReviewLogin = useSelector((state) => state.userReviewLogin);
  const { loading, error, userReviewInfo } = userReviewLogin;

  const createReview = useSelector((state) => state.createReview);
  const { success, error: reviewError } = createReview;

  const profileState = useSelector((state) => state.profileById);
  const { profile } = profileState;

  //This is the profile id of the person that you are going to review
  const userId = useSelector((state) => state.userReviewId);
  const { userProfileId } = userId;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch login
    dispatch(userReviewLoginAction(email, password, userProfileId));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    // Dispatch reviewer comment of trainer
    dispatch(
      createUserReviewAction(userReviewInfo._id, {
        rating,
        comment,
        showName,
        userProfileId,
      }),
    );
    setRating(5);
    setComment('');
  };

  return (
    <div className="user-review-login-wrapper">
      {error ? <Message message={error} /> : null}

      {!userReviewInfo ? (
        loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <fieldset className="fieldSet">
              <legend>Review a Trainer Login form</legend>
              <form onSubmit={handleSubmit}>
                <InputField
                  label="Email"
                  type="email"
                  name={email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
                  error={
                    !emailRegEx.test(email) && email.length !== 0
                      ? `Invalid email address.`
                      : null
                  }
                />
                <InputField
                  label="Password"
                  type="password"
                  name={password}
                  value={password}
                  required
                  className={
                    !passwordRegEx.test(password) ? 'invalid' : 'entered'
                  }
                  error={
                    !passwordRegEx.test(password) && password.length !== 0
                      ? `Password must contain at least 1 uppercase letter and a number`
                      : null
                  }
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  colour="transparent"
                  text="submit"
                  className="btn"
                  disabled={
                    !passwordRegEx.test(password) || !emailRegEx.test(email)
                  }
                ></Button>
              </form>
            </fieldset>
            <div>
              <p>
                <LinkComp
                  route="reviewer-register"
                  routeName="Register here to review"
                />
              </p>
            </div>
          </>
        )
      ) : (
        <>
          <div
            className="reviewer-wrapper"
            style={{
              backgroundImage: `url(uploads/profiles/${profile?.profileImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            {reviewError ? <Message message={reviewError} /> : null}
            {success ? (
              <Message message="Your review has been sent." success />
            ) : null}

            <fieldset className="fieldSet item">
              <legend>PROFILE</legend>
              <div className="review-specialisation-wrapper">
                <p className="review-specialisation">
                  {profile?.specialisationOne}
                </p>
                <p className="review-specialisation">
                  {profile?.specialisationTwo}
                </p>
                <p className="review-specialisation">
                  {profile?.specialisationThree}
                </p>
                <p className="review-specialisation">
                  {profile?.specialisationFour}
                </p>
              </div>

              <div className="review-detail-wrapper ">
                <div>
                  <div className="full-profile-name">{profile?.name}</div>
                  <Rating
                    value={profile?.rating}
                    text={`  from ${profile?.numReviews} reviews`}
                  />
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
              </div>
              <div>
                {profile?.reviews.length > 0 ? (
                  <>
                    <h1>Reviews</h1>
                    {profile.reviews.map((review) => (
                      <div key={review._id}>
                        <Review
                          reviewer={review.name}
                          review={review.comment}
                          reviewedOn={moment(review.createdAt).fromNow()}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <h1>Reviews</h1>
                    <p>There is currently no reviews for {profile?.name}.</p>
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
            </fieldset>

            <fieldset className="fieldSet item">
              <legend>Review {profile?.name}</legend>
              <div className="review-specialisation-wrapper">
                <p className="review-specialisation">
                  {profile?.specialisationOne}
                </p>
                <p className="review-specialisation">
                  {profile?.specialisationTwo}
                </p>
                <p className="review-specialisation">
                  {profile?.specialisationThree}
                </p>
                <p className="review-specialisation">
                  {profile?.specialisationFour}
                </p>
              </div>

              <form onSubmit={handleReviewSubmit}>
                <div>
                  <div>
                    <h3>Warning</h3>
                    <p>Warning to info reviewer that this is a once off...</p>
                  </div>
                  <label>
                    <input
                      type="checkbox"
                      checked={showName}
                      onChange={() => setShowName((showName = !showName))}
                    />
                    <span className="userReviewInfo">
                      {userReviewInfo?.name}
                    </span>
                    , by checking this box you are agreeing to display your name
                    in the review.
                  </label>
                </div>
                <div>
                  <label>Rating </label>

                  <div>
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="5">five</option>
                      <option value="4">four</option>
                      <option value="3">three</option>
                      <option value="2">two</option>
                      <option value="1">one</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label>Review</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    name="comment"
                    required
                    className={comment?.length <= 10 ? 'invalid' : 'entered'}
                    error={
                      comment?.length <= 10
                        ? `comment field must contain at least 10 characters!`
                        : null
                    }
                  />
                </div>
                <Button
                  colour="transparent"
                  text="submit"
                  className="btn"
                  disabled={!rating || (comment.length <= 10 && success)}
                ></Button>
              </form>
            </fieldset>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewerLoginView;
