import axios from 'axios';

import {
  USER_ADMIN_DELETE_FAILURE,
  USER_ADMIN_DELETE_REQUEST,
  USER_ADMIN_DELETE_SUCCESS,
  USER_ADMIN_REVIEWER_DETAILS_FAILURE,
  USER_ADMIN_REVIEWER_DETAILS_REQUEST,
  USER_ADMIN_REVIEWER_DETAILS_SUCCESS,
  USER_REVIEWER_REGISTER_FAILURE,
  USER_REVIEWER_REGISTER_REQUEST,
  USER_REVIEWER_REGISTER_SUCCESS,
  USER_REVIEW_CREATE_COMMENT_FAILURE,
  USER_REVIEW_CREATE_COMMENT_REQUEST,
  USER_REVIEW_CREATE_COMMENT_SUCCESS,
  USER_REVIEW_ID_FAILURE,
  USER_REVIEW_ID_REQUEST,
  USER_REVIEW_ID_SUCCESS,
  USER_REVIEW_LOGIN_FAILURE,
  USER_REVIEW_LOGIN_REQUEST,
  USER_REVIEW_LOGIN_SUCCESS,
  USER_REVIEW_LOGOUT,
} from '../constants/userReviewConstants';

// Get all reviewers details ADMIN
export const userAdminReviewersDetailsAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_ADMIN_REVIEWER_DETAILS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/reviewers/admin/:id`, config);
      dispatch({ type: USER_ADMIN_REVIEWER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_ADMIN_REVIEWER_DETAILS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// Delete user REVIEWER ADMIN only
export const deleteReviewerAdminAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADMIN_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/reviewer/admin/${id}`, config);
    dispatch({ type: USER_ADMIN_DELETE_SUCCESS });
    dispatch(userAdminReviewersDetailsAction());
  } catch (error) {
    dispatch({
      type: USER_ADMIN_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User REVIEWER LOGIN
export const userReviewLoginAction =
  (email, password, userProfileId) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REVIEW_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users-review/login',
        { email: email, password: password, userProfileId: userProfileId },
        config,
      );

      dispatch({ type: USER_REVIEW_LOGIN_SUCCESS, payload: data });
      localStorage.setItem('userReviewInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REVIEW_LOGIN_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// Reviewer Registration actions
export const reviewerRegisterAction =
  (name, email, password, userProfileId) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REVIEWER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users-review',
        {
          name: name,
          email: email,
          password: password,
          userProfileId: userProfileId,
        },
        config,
      );

      dispatch({ type: USER_REVIEWER_REGISTER_SUCCESS, payload: data });
      // Replace this to redirect to login
      // dispatch({ type: USER_REVIEWER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem('userReviewInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REVIEWER_REGISTER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
//Reviewer logout action
export const reviewLogoutAction = () => (dispatch) => {
  localStorage.removeItem('userReviewInfo');
  dispatch({ type: USER_REVIEW_LOGOUT });
};

// Grabbing the USER/TRAINER ID
export const userReviewIdAction = (userProfileId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REVIEW_ID_REQUEST,
    });

    dispatch({ type: USER_REVIEW_ID_SUCCESS, payload: userProfileId });
  } catch (error) {
    dispatch({
      type: USER_REVIEW_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//Create review actions
export const createUserReviewAction =
  (userReviewerId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_REVIEW_CREATE_COMMENT_REQUEST,
      });

      const {
        userReviewLogin: { userReviewInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userReviewInfo.token}`,
        },
      };

      await axios.post(
        `/api/profiles/${userReviewerId}/reviews`,
        review,
        config,
      );

      dispatch({ type: USER_REVIEW_CREATE_COMMENT_SUCCESS });
    } catch (error) {
      dispatch({
        type: USER_REVIEW_CREATE_COMMENT_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
