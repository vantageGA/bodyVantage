import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import LinkComp from '../../components/linkComp/LinkComp';
import { loginAction } from '../../store/actions/userActions';
import './LoginFormView.scss';

const LoginFormView = () => {
  const navigate = useNavigate();

  const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo !== undefined) {
      navigate('/user-profile-edit');
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch login
    dispatch(loginAction(email, password));
  };

  return (
    <div className="login-form-wrapper">
      {error ? <Message message={error} /> : null}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <fieldset className="fieldSet">
          <legend>Login form</legend>
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
              className={!passwordRegEx.test(password) ? 'invalid' : 'entered'}
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
      )}

      <div>
        <p>
          New to our platform ?{' '}
          <LinkComp route="registration" routeName="Register" /> here.
        </p>
      </div>
    </div>
  );
};

export default LoginFormView;
