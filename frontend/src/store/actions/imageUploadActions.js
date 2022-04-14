import axios from 'axios';
import {
  USER_PROFILE_IMAGE_UPLOAD_FAILURE,
  USER_PROFILE_IMAGE_UPLOAD_REQUEST,
  USER_PROFILE_IMAGE_UPLOAD_SUCCESS,
} from '../constants/uploadImageConstants';

import { getUserDetailsAction } from './userActions';

export const userProfileImageUploadAction =
  (imageFormData, id) => async (dispatch, getState) => {
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

      dispatch(getUserDetailsAction(id));
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
