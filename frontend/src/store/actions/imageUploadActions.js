import axios from 'axios';
import {
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
