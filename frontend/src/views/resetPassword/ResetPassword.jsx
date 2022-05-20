import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ResetPassword.scss';

import Message from '../../components/message/Message';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import LinkComp from '../../components/linkComp/LinkComp';

import { updateUserPasswordAction } from '../../store/actions/userActions';

const ResetPassword = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const passwordRegEx =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const passwordConfirmRegEx =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { success, error, message: SuccessMessage } = userUpdatePassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      // Dispatch registration data
      dispatch(
        updateUserPasswordAction({
          resetPasswordToken: params.token,
          password: password,
        }),
      );
      setMessage(null);
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="reset-pw-wrapper">
      {message ? <Message message={message} /> : null}
      {success ? (
        <>
          <Message message={SuccessMessage} success />
          <LinkComp route="login" routeName="Navigate to login form" />
        </>
      ) : (
        <fieldset className="fieldSet">
          <legend>
            Members <span>Reset Password</span> form
          </legend>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Password"
              type="password"
              name={password}
              value={password}
              required
              className={!passwordRegEx.test(password) ? 'invalid' : 'entered'}
              error={
                !passwordRegEx.test(password) && password.length !== 0
                  ? `Password must contain at least l Capital letter, 1 number and 1 special character.`
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
                  ? `Password must contain at least l Capital letter, 1 number and 1 special character.`
                  : null
              }
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              colour="transparent"
              text="submit"
              className="btn"
              disabled={
                !passwordRegEx.test(password) ||
                !passwordConfirmRegEx.test(confirmPassword)
              }
            ></Button>
          </form>
        </fieldset>
      )}
      {error ? <Message message={error} /> : null}
      {success}
    </div>
  );
};

export default ResetPassword;
