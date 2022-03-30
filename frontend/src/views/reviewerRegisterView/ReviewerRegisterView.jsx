import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ReviewerRegisterView.scss';

import { reviewerRegisterAction } from '../../store/actions/userReviewActions';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import LinkComp from '../../components/linkComp/LinkComp';

const ReviewerRegisterView = () => {
  const nameRegEx = /^([\w])+\s+([\w\s])+$/i;
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
  const passwordConfirmRegEx =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;

  const dispatch = useDispatch();

  const userReviewerRegistration = useSelector(
    (state) => state.userReviewerRegistration,
  );
  const { loading, error, success, userReviewerInfo } =
    userReviewerRegistration;

  const userId = useSelector((state) => state.userReviewId);
  const { userReviewId } = userId;
  console.log(userReviewId);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [registrationConfirmation, setRegistrationConfirmation] = useState('');

  useEffect(() => {
    if (userReviewerInfo && userReviewerInfo !== undefined) {
      const warn =
        userReviewerInfo.name +
        ' your profile is created.' +
        ' You will receive an email with a link asking to confirm your email address.' +
        ' Please do this before logging in, in order to give you full functionality.';
      setRegistrationConfirmation(warn);
    }
  }, [userReviewerInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Contact form action
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      // Dispatch registration data
      dispatch(reviewerRegisterAction(name, email, password, userReviewId));
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="reviewer-register-wrapper">
      {error ? <Message message={error} /> : null}
      {message ? <Message message={message} /> : null}
      {success ? <Message message={registrationConfirmation} success /> : null}

      {userReviewerInfo ? (
        <LinkComp
          route="reviewer-login"
          routeName="Please login by clicking here"
        />
      ) : !userReviewerInfo && loading ? (
        <LoadingSpinner />
      ) : (
        <fieldset className="fieldSet">
          <legend>Reviewer Registration form</legend>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              required
              className={!nameRegEx.test(name) ? 'invalid' : 'entered'}
              error={
                !nameRegEx.test(name) && name.length !== 0
                  ? `Name field must start with an uppercase letter and contain at least 3 letters and have no white space.`
                  : null
              }
            />

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
              className={!passwordRegEx.test(password) ? 'invalid' : 'entered'}
              error={
                !passwordRegEx.test(password) && password.length !== 0
                  ? `Password must contain at least 1 uppercase letter and a number`
                  : null
              }
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputField
              label="Confirm Password"
              type="password"
              name={confirmPassword}
              value={confirmPassword}
              required
              className={
                !passwordConfirmRegEx.test(confirmPassword)
                  ? 'invalid'
                  : 'entered'
              }
              error={
                !passwordConfirmRegEx.test(confirmPassword) &&
                confirmPassword.length !== 0
                  ? `Password must contain at least 1 uppercase letter and a number`
                  : null
              }
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              colour="transparent"
              text="submit"
              className="btn"
              disabled={
                !nameRegEx.test(name) ||
                !passwordRegEx.test(password) ||
                !passwordConfirmRegEx.test(confirmPassword) ||
                !emailRegEx.test(email)
              }
            ></Button>
          </form>
        </fieldset>
      )}
    </div>
  );
};

export default ReviewerRegisterView;
