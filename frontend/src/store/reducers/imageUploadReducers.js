import {
  PROFILE_IMAGE_UPLOAD_FAILURE,
  PROFILE_IMAGE_UPLOAD_REQUEST,
  PROFILE_IMAGE_UPLOAD_SUCCESS,
  USER_PROFILE_IMAGE_UPLOAD_FAILURE,
  USER_PROFILE_IMAGE_UPLOAD_REQUEST,
  USER_PROFILE_IMAGE_UPLOAD_SUCCESS,
} from '../constants/uploadImageConstants';

// USER profile image reducer
export const userProfileImageReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_IMAGE_UPLOAD_REQUEST:
      return { ...state, loading: true };
    case USER_PROFILE_IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userProfileImage: action.payload,
      };
    case USER_PROFILE_IMAGE_UPLOAD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

// PROFILE image reducer
export const profileImageReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_IMAGE_UPLOAD_REQUEST:
      return { ...state, loading: true };
    case PROFILE_IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userProfileImage: action.payload,
      };
    case PROFILE_IMAGE_UPLOAD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
