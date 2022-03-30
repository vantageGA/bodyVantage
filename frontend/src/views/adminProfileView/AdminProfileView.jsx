import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './AdminProfileView.scss';

import {
  profilesAdminAction,
  deleteProfileAction,
  profileVerifyQualificationAction,
  deleteReviewProfileAction,
} from '../../store/actions/profileActions';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Message from '../../components/message/Message';
import Button from '../../components/button/Button';
import SearchInput from '../../components/searchInput/SearchInput';

import moment from 'moment';

const AdminProfileView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [showReviewsId, setShowReviewsId] = useState('');

  let [showReviews, setShowReviews] = useState(false);

  // Logged in user Details saved in local storage
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
    dispatch(profilesAdminAction());
  }, [dispatch, navigate, userInfo]);

  const profilesState = useSelector((state) => state.profilesAdmin);
  const { loading, error, success, profilesAdmin } = profilesState;

  console.log('DDD', profilesAdmin);

  const handleDeleteProfile = (id) => {
    // Dispatch user delete action
    if (window.confirm(`Are you sure you want to delete ${id}`)) {
      dispatch(deleteProfileAction(id));
    }
  };

  const handleVerify = (id) => {
    // Dispatch verify qualification
    if (window.confirm(`Are you sure you want to update this ${id}`)) {
      dispatch(profileVerifyQualificationAction(id));
    }
  };

  const handleDeleteReview = (profileId, reviewId) => {
    //Dispatch delete Review action
    if (window.confirm(`Are you sure you want to update this ${profileId}`)) {
      dispatch(deleteReviewProfileAction(profileId, reviewId));
    }
  };

  const searchedProfiles = profilesAdmin.filter((profile) => {
    if (keyword) {
      return profile.name.toLowerCase().includes(keyword.toLowerCase());
    } else {
      return profilesAdmin;
    }
  });

  // Search
  const [newProfilesAdmin, setNewProfilesAdmin] = useState(profilesAdmin);
  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearchClear = () => {
    setKeyword('');
  };
  //SearchInput

  //sort
  const sortByRatingUp = (a, b) => {
    return parseInt(a.rating) - parseInt(b.rating);
  };
  const sortByRatingDown = (a, b) => {
    return parseInt(b.rating) - parseInt(a.rating);
  };

  const handleSort = (val) => {
    const newProfilesAdmin = [...profilesAdmin];
    switch (val) {
      case 'ratingUp':
        profilesAdmin.sort(sortByRatingUp);
        break;
      case 'ratingDown':
        profilesAdmin.sort(sortByRatingDown);
        break;
      default:
        return;
    }
    setNewProfilesAdmin(newProfilesAdmin);
  };

  useEffect(() => {
    setNewProfilesAdmin(newProfilesAdmin);
  }, [newProfilesAdmin]);

  //sort

  return (
    <>
      <fieldset className="fieldSet">
        <legend>Profiles</legend>
        {error ? <Message message={error} /> : null}
        {success ? (
          <Message message="Profile has been successfully deleted" />
        ) : null}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="admin-profile-view-wrapper">
            <div className="admin-keyword-search">
              <SearchInput
                type="search"
                value={keyword}
                handleSearch={handleSearch}
                label="SEARCH A NAME"
              />
              <Button
                colour="transparent"
                text="Clear search"
                className="btn"
                title="Clear Search"
                onClick={handleSearchClear}
                disabled={!keyword}
              ></Button>
            </div>

            <p>There currently {searchedProfiles.length} profiles.</p>
            <div className="heading admin-profile-inner-wrapper">
              <div className="item">NAME</div>
              <div className="item"> VERIFIED</div>
              <div className="item wider-item">DESCRIPTION</div>
              <div className="item">
                <div className="sort-wrapper">
                  <span onClick={() => handleSort('ratingUp')}>
                    <i
                      className="arrow fas fa-arrow-up"
                      style={{
                        fontSize: 14 + 'px',
                        color: 'black',
                        marginRight: 4 + 'px',
                      }}
                    ></i>
                  </span>
                  <span>RATING</span>
                  <span onClick={() => handleSort('ratingDown')}>
                    <i
                      className="arrow fas fa-arrow-down"
                      style={{
                        fontSize: 14 + 'px',
                        color: 'black',
                        marginLeft: 4 + 'px',
                      }}
                    ></i>
                  </span>
                </div>
              </div>
              <div className="item">REVIEWS</div>
              <div className="item">CREATED</div>
              <div className="item">UPDATED</div>
            </div>
            {searchedProfiles.map((profile, index) => (
              <div key={profile._id} className="admin-profile-inner-wrapper">
                <div className="item">
                  <Button
                    colour="transparent"
                    text="Delete Profile"
                    className="btn"
                    title="Delete Profile"
                    onClick={() => handleDeleteProfile(profile._id)}
                    disabled={!profile._id}
                  ></Button>
                  <p>{profile.name}</p>
                  <img
                    className="image"
                    src={`../uploads/profiles/${profile.profileImage}`}
                    alt={profile.name}
                  />
                  <p>{profile.email}</p>
                  <p>{profile.telephoneNumber}</p>
                </div>

                <div className="item">
                  <>
                    <Button
                      colour="transparent"
                      text="Verify Qualifications"
                      className="btn"
                      title="Verify Qualifications"
                      onClick={() => handleVerify(profile._id)}
                      disabled={!profile._id}
                    ></Button>

                    {profile.isQualificationsVerified === true ? (
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
                  </>
                </div>

                <div className="item wider-item">
                  <h3>Description</h3>
                  {profile.description}
                  <h3>Location</h3>
                  {profile.location}
                </div>

                <div className="item">{profile.rating}</div>

                <div className="item">
                  {profile.numReviews}

                  <Button
                    colour="transparent"
                    text={
                      showReviewsId === profile._id && showReviews
                        ? 'HIDE Reviews'
                        : 'SHOW Reviews'
                    }
                    className="btn"
                    title="Show Admin"
                    onClick={() =>
                      setShowReviewsId(
                        profile._id,
                        setShowReviews((showReviews = !showReviews)),
                      )
                    }
                    disabled={
                      showReviewsId !== profile._id && showReviews
                        ? true
                        : false
                    }
                  ></Button>
                  {showReviewsId === profile._id && showReviews
                    ? profile.reviews.map((review) => (
                        <div key={review._id}>
                          <div className="review-item">
                            <p>By: {review.name}</p>
                            <p>Review: {review.comment}</p>
                            <p>Rating: {review.rating}</p>
                            <Button
                              colour="transparent"
                              text="Delete Review"
                              className="btn"
                              title="Delete Review"
                              onClick={() =>
                                handleDeleteReview(profile._id, review._id)
                              }
                              disabled={false}
                            ></Button>
                          </div>
                        </div>
                      ))
                    : null}
                </div>

                <div className="item">
                  {moment(profile.createdAt).fromNow()}
                </div>

                <div className="item">
                  {moment(profile.updatedAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        )}
      </fieldset>
    </>
  );
};

export default AdminProfileView;
