import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

import LinkComp from '../linkComp/LinkComp';
import LoginOut from '../login-out/LoginOut';

import { logoutAction } from '../../store/actions/userActions';
import { reviewLogoutAction } from '../../store/actions/userReviewActions';
import { USER_REVIEW_CREATE_COMMENT_RESET } from '../../store/constants/userReviewConstants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userReviewLogin = useSelector((state) => state.userReviewLogin);
  const { userReviewInfo } = userReviewLogin;

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/');
  };
  const handleReviewerLogout = () => {
    dispatch({ type: USER_REVIEW_CREATE_COMMENT_RESET });
    dispatch(reviewLogoutAction());
  };

  return (
    <header>
      <fieldset className="fieldSet">
        <legend>
          <LinkComp route="" routeName="Body Vantage Logo" />
        </legend>
        <nav className="nav-wrapper">
          <div className="large-tabs">
            <LinkComp
              route=""
              routeName={
                <>
                  <i className="fa-solid fa-house fa-2xl"></i>
                </>
              }
            />
          </div>

          <div className="large-tabs">
            <LinkComp
              route="contact"
              routeName={
                <>
                  <i className="fa-solid fa-envelope-open fa-2xl"></i>
                </>
              }
            />
          </div>

          <div className="large-tabs">
            <LinkComp
              route="about"
              routeName={
                <>
                  <i className="fa-solid fa-info fa-2xl"></i>
                </>
              }
            />
          </div>

          {userInfo ? (
            <div className="large-tabs">
              <LinkComp
                route="user-profile-edit"
                routeName={
                  <>
                    <i className="fa-solid fa-screwdriver-wrench fa-2xl"></i>
                  </>
                }
              />
            </div>
          ) : null}

          <div className="large-tabs">
            {userReviewInfo ? (
              <LoginOut
                description={userReviewInfo.name}
                definition="Logout"
                onClick={handleReviewerLogout}
              />
            ) : null}

            {userInfo ? (
              <div className="user-info-wrapper">
                <div className="members-login--wrapper">
                  {/* Use attribute = definition if its not a link */}
                  <LoginOut
                    description=""
                    definition={
                      <i className="fa-solid fa-user-minus fa-2xl"></i>
                    }
                    onClick={handleLogout}
                  />
                </div>
              </div>
            ) : (
              <>
                {!userReviewInfo ? (
                  <LoginOut
                    description=""
                    route="login"
                    routeDescription={
                      <i className="fa-solid fa-user-plus fa-2xl"></i>
                    }
                  />
                ) : null}
              </>
            )}
          </div>
        </nav>
      </fieldset>
    </header>
  );
};

export default Header;
