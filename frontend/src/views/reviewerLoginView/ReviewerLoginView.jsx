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
  userReviewersDetailsAction,
} from '../../store/actions/userReviewActions';

import moment from 'moment';

const ReviewerLoginView = () => {
  const dispatch = useDispatch();
  const passwordRegEx = /([^\s])/;
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rating, setRating] = useState(5);
  let [showName, setShowName] = useState(false);
  const [comment, setComment] = useState('');
  const [showWarning, setShowWaring] = useState(true);
  const [acceptConditions, setAcceptConditions] = useState(false);
  const [noUserProfile, setNoUserProfile] = useState('');

  // Info stored in local storage
  const userReviewLogin = useSelector((state) => state.userReviewLogin);
  const { loading, error, userReviewInfo } = userReviewLogin;

  const createReview = useSelector((state) => state.createReview);
  const { success, error: reviewError } = createReview;

  const profileState = useSelector((state) => state.profileById);
  const { profile } = profileState;

  //This is the profile id of the person that you are going to review
  const userId = useSelector((state) => state.userReviewId);
  const { userProfileId } = userId;

  const userReviewersDetails = useSelector(
    (state) => state.userReviewersDetails,
  );
  const { reviewer } = userReviewersDetails;

  const handleAcceptConditions = () => {
    if (userReviewInfo) {
      dispatch(userReviewersDetailsAction(userReviewInfo._id));
    }
    setShowWaring(false);
    if (reviewer?.isConfirmed) {
      setAcceptConditions(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (profile) {
      dispatch(userReviewLoginAction(email, password, profile?.user));
    } else {
      setNoUserProfile(
        'You have not selected a user to review or you email address has not been confirmed',
      );
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    // Dispatch reviewer comment of trainer
    dispatch(
      createUserReviewAction(userReviewInfo?._id, {
        rating,
        comment,
        showName,
        userProfileId,
        acceptConditions,
      }),
    );
    setRating(5);
    setComment('');
  };

  return (
    <div className="user-review-login-wrapper">
      {error ? <Message message={error} /> : null}
      {noUserProfile ? <Message message={noUserProfile} /> : null}

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
                      ? `Password can not be empty`
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
          <div className="reviewer-wrapper">
            {reviewError ? <Message message={reviewError} /> : null}
            {reviewer?.isConfirmed === false ? (
              <Message message="PLEASE CONFIRM YOUR EMAIL ADDRESS" />
            ) : null}
            {success ? (
              <Message message="Your review has been sent." success />
            ) : null}
            <fieldset
              className="fieldSet item"
              style={{
                backgroundImage: `url(${profile?.profileImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
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

              {showWarning ? (
                <>
                  <h1>Reviewer Conditions</h1>
                  <h3>When to write a review</h3>
                  <p>
                    You can write a review if you’ve had a recent, genuine
                    experience.
                  </p>
                  <p>
                    Reviews are your chance to share your experiences with
                    others and give feedback to companies. Size doesn’t matter
                    here, we think all experiences big and small are worth
                    reviewing — whether it’s a phone call, an online enquiry.
                  </p>
                  <p>
                    Just keep it fresh by writing about your experience that
                    happened in the past 12 months.
                  </p>
                  <h3>Dont write a fake or biased review</h3>
                  <p>
                    Don’t make up an experience or write a review for someone
                    else — leave it to them to write their own review. And if
                    you’re closely associated with, work for, or are in
                    competition with a particular company, you shouldn’t review
                    it.
                  </p>
                  <h3>Keep proof of your experience</h3>
                  <p>
                    Hold onto documentation that shows you’ve had an experience
                    with the company (for example, a receipt, order
                    confirmation, screenshot of your chat with online customer
                    service) because you might be asked to verify your
                    experience.
                  </p>
                  <h3>Play nice</h3>
                  <p>
                    We expect you to be a respectful contributor to our
                    platform. So play nice, don’t be a jerk. Don’t post anything
                    harmful, hateful, discriminatory, defamatory or obscene. And
                    don’t lie, bully, blackmail, make threats or do anything
                    illegal.
                  </p>
                  <h3>The final say</h3>
                  <p>
                    These guidelines are just that: guiding principles. Please
                    understand that we have the final say with regard to the
                    interpretation and application of these guidelines, and we
                    can update them at any time.
                  </p>

                  <Button
                    colour="transparent"
                    text="Accept Review Guidelines"
                    className="btn"
                    onClick={handleAcceptConditions}
                    disabled={false}
                  ></Button>
                </>
              ) : (
                <>
                  <form onSubmit={handleReviewSubmit}>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={showName}
                          onChange={() => setShowName((showName = !showName))}
                        />
                        <span className="userReviewInfo">
                          {userReviewInfo?.name}
                        </span>
                        , by checking this box you are agreeing to display your
                        name in the review.
                      </label>
                    </div>
                    <div>
                      <label>Rating </label>

                      <div>
                        <select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="2">2 Stars</option>
                          <option value="1">1 Star</option>
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
                        className={
                          comment?.length <= 10 ? 'invalid' : 'entered'
                        }
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
                      disabled={
                        !rating ||
                        (comment.length <= 10 &&
                          success &&
                          !reviewer?.isConfirmed)
                      }
                    ></Button>
                  </form>
                </>
              )}
            </fieldset>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewerLoginView;
