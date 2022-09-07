import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import './Header.scss';

import logo from '../../assets/logo/logo.svg';

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
        {/* <legend>
          <LinkComp route="" routeName="Body Vantage" />
        </legend> */}
        <nav className="nav-wrapper">
          <div className="large-tabs">
            <NavLink
              to="/"
              className={(nav) => (nav.isActive ? 'is-active' : '')}
            >
              <img className="image-wrapper" src={logo} alt="" />
            </NavLink>
          </div>

          <div className="large-tabs">
            <NavLink
              to="/contact"
              className={(nav) => (nav.isActive ? 'is-active' : '')}
            >
              <i className="fa-solid fa-envelope-open fa-2xl"></i>
            </NavLink>
          </div>

          <div className="large-tabs">
            <NavLink
              to="/about"
              className={(nav) => (nav.isActive ? 'is-active' : '')}
            >
              <i className="fa-solid fa-info fa-2xl"></i>
            </NavLink>
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
                    description="LOGOUT"
                    definition={
                      <span className="members-login-text">
                        {userInfo.name}
                      </span>
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
