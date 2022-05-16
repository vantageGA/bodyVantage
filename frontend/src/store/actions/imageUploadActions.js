import axios from 'axios';
import {
  PROFILE_IMAGES_DELETE_FAILURE,
  PROFILE_IMAGES_DELETE_REQUEST,
  PROFILE_IMAGES_DELETE_SUCCESS,
  PROFILE_IMAGE_UPLOAD_FAILURE,
  PROFILE_IMAGE_UPLOAD_REQUEST,
  PROFILE_IMAGE_UPLOAD_SUCCESS,
  USER_PROFILE_IMAGE_UPLOAD_FAILURE,
  USER_PROFILE_IMAGE_UPLOAD_REQUEST,
  USER_PROFILE_IMAGE_UPLOAD_SUCCESS,
} from '../constants/uploadImageConstants';

import { getUserDetailsAction } from './userActions';
import { profileOfLoggedInUserAction } from './profileActions';

// USER profile image action
export const userProfileImageUploadAction =
  (imageFormData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_PROFILE_IMAGE_UPLOAD_REQUEST,
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

      const { data } = await axios.post(
        '/api/userProfileUpload',
        imageFormData,
        config,
      );

      dispatch({
        type: USER_PROFILE_IMAGE_UPLOAD_SUCCESS,
        payload: data,
      });

      dispatch(getUserDetailsAction(userInfo._id));
    } catch (error) {
      dispatch({
        type: USER_PROFILE_IMAGE_UPLOAD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// PROFILE image action
export const profileImageUploadAction =
  (imageFormData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_IMAGE_UPLOAD_REQUEST,
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

      const { data } = await axios.post(
        '/api/profileUpload',
        imageFormData,
        config,
      );

      dispatch({
        type: PROFILE_IMAGE_UPLOAD_SUCCESS,
        payload: data,
      });

      dispatch(profileOfLoggedInUserAction());
    } catch (error) {
      dispatch({
        type: PROFILE_IMAGE_UPLOAD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// DELETE Profile Images for ProfileImage model
export const deleteProfileImageAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_IMAGES_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // Note: This can only be done like this in axios delete body
    //https://stackoverflow.com/questions/51069552/axios-delete-request-with-body-and-headers

    await axios.delete(`api/profile-image/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: {},
    });
    dispatch({ type: PROFILE_IMAGES_DELETE_SUCCESS });
    dispatch(profileOfLoggedInUserAction());
  } catch (error) {
    dispatch({
      type: PROFILE_IMAGES_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
