import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Cookies.scss';

import { cookiesAction } from '../../store/actions/cookiesAction';

import Button from '../button/Button';
import LinkComp from '../linkComp/LinkComp';

const Cookies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookies = useSelector((state) => state.cookies);
  const { success } = cookies;

  const handleDismiss = () => {
    // Dispatch Cookies Action
    dispatch(cookiesAction());
  };

  const handleDismissCookies = () => {
    navigate('/cookies', { replace: true });
  };
  return (
    <>
      {!success ? (
        <div className="cookies-wrapper">
          <fieldset className="fieldSet">
            <legend>Cookies & Privacy</legend>
            <h1>Cookies, Terms & Conditions</h1>
            <p>By using our website you are agreeing to our cookies policy.</p>
            <div className="link-wrapper">
              <p>
                <LinkComp route="cookies" routeName="Cookies Policy" />
              </p>
              <p>
                <LinkComp route="privacy" routeName="Privacy Policy" />
              </p>
            </div>

            <div>
              <span className="small-text">
                Please email{' '}
                <a href="mailto:zack@fisicalfitness.co.uk"> MANAGEMENT </a> with
                any queries you might have.
              </span>
            </div>
            <div className="button-wrapper">
              <Button
                type="button"
                colour="transparent"
                onClick={handleDismiss}
                title="Accept Cookies"
                text=" Accept Cookies"
                disabled={false}
              />
              <Button
                type="button"
                colour="crimson"
                onClick={handleDismissCookies}
                title="Dont Accept Cookies"
                text=" Dont Accept"
                disabled={false}
              />
            </div>
          </fieldset>
        </div>
      ) : null}
    </>
  );
};

export default Cookies;
