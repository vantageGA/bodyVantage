import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './AdminUserView.scss';

import {
  usersAction,
  deleteUserAction,
  userAddRemoveAdminAction,
} from '../../store/actions/userActions';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import Button from '../../components/button/Button';

import moment from 'moment';

const AdminView = () => {
  const [showAdmin, setShowAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logged in user Details saved in local storage
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
    dispatch(usersAction());
  }, [dispatch, navigate, userInfo]);

  const usersState = useSelector((state) => state.users);
  const { loading, error, userProfiles } = usersState;

  const handleDeleteUser = (id) => {
    // Dispatch user delete action
    if (window.confirm(`Are you sure you want to delete ${id}`)) {
      dispatch(deleteUserAction(id));
      dispatch(usersAction());
    }
  };

  const handleMakeAdmin = (id, val) => {
    //Dispatch Action here
    dispatch(userAddRemoveAdminAction({ id, val }));
  };

  const handleShowAdmin = () => {
    setShowAdmin(!showAdmin);
  };

  return (
    <>
      <fieldset className="fieldSet">
        <legend>Users</legend>
        {error ? <Message message={error} /> : null}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Button
              colour="transparent"
              text={!showAdmin ? 'Show Admin' : 'Hide Admin'}
              className="btn"
              title="Show Admin"
              onClick={handleShowAdmin}
              disabled={false}
            ></Button>

            <div className="admin-view-wrapper">
              <div className=" heading admin-view-inner-wrapper">
                <div className="item">NAME</div>
                <div className="item">IS-ADMIN</div>
                <div className="item">CONFIRMED</div>
                <div className="item">CREATED</div>
                <div className="item">UPDATED</div>
              </div>

              {userProfiles.map((userProfile) => (
                <div
                  key={userProfile._id}
                  className={
                    !showAdmin && userProfile.isAdmin
                      ? 'admin-view-inner-wrapper isAdmin'
                      : 'admin-view-inner-wrapper'
                  }
                >
                  <div
                    className={
                      userProfile.isAdmin ? 'item showIsAdmin' : 'item'
                    }
                  >
                    <p className="small-text">{userProfile._id}</p>
                    <p>{userProfile.name}</p>
                    <img
                      className="image"
                      src={`../uploads/profiles/${userProfile.profileImage}`}
                      alt={userProfile.name}
                    />
                    <p>{userProfile.email}</p>
                    <Button
                      colour="transparent"
                      text="Delete User"
                      className="btn"
                      title={
                        userProfile.isAdmin
                          ? 'You CANT delete ADMIN'
                          : 'Delete User'
                      }
                      onClick={() => handleDeleteUser(userProfile._id)}
                      disabled={!userProfile.isConfirmed || userProfile.isAdmin}
                    ></Button>
                  </div>

                  <div className="item">
                    {userProfile.isAdmin ? (
                      <Button
                        colour="transparent"
                        text="Remove as Admin"
                        className="btn"
                        title={
                          userProfile.isAdmin
                            ? 'You CANT create admin'
                            : 'Make Admin'
                        }
                        onClick={() => handleMakeAdmin(userProfile._id, false)}
                        disabled={!userProfile.isConfirmed}
                      ></Button>
                    ) : (
                      <Button
                        colour="transparent"
                        text="Make Admin"
                        className="btn"
                        title={
                          userProfile.isAdmin
                            ? 'You CANT create admin'
                            : 'Make Admin'
                        }
                        onClick={() => handleMakeAdmin(userProfile._id, true)}
                        disabled={!userProfile.isConfirmed}
                      ></Button>
                    )}

                    {userProfile.isAdmin === true ? (
                      <i
                        className="fa fa-check"
                        style={{
                          fontSize: 20 + 'px',
                          color: 'rgba(92, 184, 92, 1)',
                        }}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-times"
                        style={{ fontSize: 20 + 'px', color: 'crimson' }}
                      ></i>
                    )}
                  </div>

                  <div className="item">
                    {userProfile.isConfirmed === true ? (
                      <i
                        className="fa fa-check"
                        style={{
                          fontSize: 20 + 'px',
                          color: 'rgba(92, 184, 92, 1)',
                        }}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-times"
                        style={{ fontSize: 20 + 'px', color: 'crimson' }}
                      ></i>
                    )}
                  </div>

                  <div className="item">
                    {moment(userProfile.createdAt).fromNow()}
                  </div>

                  <div className="item">
                    {moment(userProfile.updatedAt).fromNow()}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </fieldset>
    </>
  );
};

export default AdminView;
