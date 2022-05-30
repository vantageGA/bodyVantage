import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ForgotPassword.scss';
import { userForgotPasswordAction } from '../../store/actions/userActions';

import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import Message from '../../components/message/Message';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const [email, setEmail] = useState('');

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { error, success } = userForgotPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch login
    dispatch(userForgotPasswordAction(email));
    setEmail('');
  };

  return (
    <div className="forgot-password-wrapper">
      {error ? <Message message={error} /> : null}
      {success ? (
        <Message
          message="Please check you email and follow the instructions therein."
          success
        />
      ) : null}

      <fieldset className="fieldSet">
        <legend>
          Members <span>Forgot Password</span> form
        </legend>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Your registered email address"
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

          <Button
            colour="transparent"
            text="submit"
            className="btn"
            disabled={!emailRegEx.test(email)}
          ></Button>
        </form>
      </fieldset>
    </div>
  );
};

export default ForgotPassword;
