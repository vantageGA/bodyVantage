import {
  PROFILE_IMAGE_UPLOAD_FAILURE,
  PROFILE_IMAGE_UPLOAD_REQUEST,
  PROFILE_IMAGE_UPLOAD_SUCCESS,
} from '../constants/uploadImageConstants';

export const profileImageReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_IMAGE_UPLOAD_REQUEST:
      return { ...state, loading: true };
    case PROFILE_IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        profileImage: action.payload,
      };
    case PROFILE_IMAGE_UPLOAD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
