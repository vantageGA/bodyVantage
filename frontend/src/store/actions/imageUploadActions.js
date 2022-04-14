import axios from 'axios';
import {
  PROFILE_IMAGE_UPLOAD_FAILURE,
  PROFILE_IMAGE_UPLOAD_REQUEST,
  PROFILE_IMAGE_UPLOAD_SUCCESS,
} from '../constants/uploadImageConstants';

import { getUserDetailsAction } from './userActions';

export const profileImageUploadAction =
  (imageFormData, id) => async (dispatch, getState) => {
    console.log('FFFFFFF', imageFormData, id);
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

      dispatch(getUserDetailsAction(id));
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
