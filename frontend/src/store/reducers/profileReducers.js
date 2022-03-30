import {
  PROFILE_ADMIN_FAILURE,
  PROFILE_ADMIN_REQUEST,
  PROFILE_ADMIN_RESET,
  PROFILE_ADMIN_SUCCESS,
  PROFILE_BY_ID_FAILURE,
  PROFILE_BY_ID_REQUEST,
  PROFILE_BY_ID_SUCCESS,
  PROFILE_CREATE_FAILURE,
  PROFILE_CREATE_REQUEST,
  PROFILE_CREATE_RESET,
  PROFILE_CREATE_SUCCESS,
  PROFILE_DELETE_FAILURE,
  PROFILE_DELETE_REQUEST,
  PROFILE_DELETE_REVIEW_FAILURE,
  PROFILE_DELETE_REVIEW_REQUEST,
  PROFILE_DELETE_REVIEW_SUCCESS,
  PROFILE_DELETE_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_OF_LOGGED_IN_USER_FAILURE,
  PROFILE_OF_LOGGED_IN_USER_REQUEST,
  PROFILE_OF_LOGGED_IN_USER_SUCCESS,
  PROFILE_REQUEST,
  PROFILE_RESET,
  PROFILE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_RESET,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_VERIFY_QUALIFICATION_FAILURE,
  PROFILE_VERIFY_QUALIFICATION_REQUEST,
  PROFILE_VERIFY_QUALIFICATION_SUCCESS,
} from '../constants/profileConstants';

// Get all profiles
export const profilesReducer = (state = { profiles: [] }, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { ...state, loading: true };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profiles: action.payload,
      };
    case PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case PROFILE_RESET:
      return { profiles: [] };
    default:
      return { ...state };
  }
};
// Get all profiles
export const profilesAdminReducer = (state = { profilesAdmin: [] }, action) => {
  switch (action.type) {
    case PROFILE_ADMIN_REQUEST:
      return { ...state, loading: true };
    case PROFILE_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        profilesAdmin: action.payload,
      };
    case PROFILE_ADMIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case PROFILE_ADMIN_RESET:
      return { profilesAdmin: [] };
    default:
      return { ...state };
  }
};
// Get profile by ID
export const profileByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case PROFILE_BY_ID_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case PROFILE_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
// Get profile of logged in user
export const profileOfLoggedInUserReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_OF_LOGGED_IN_USER_REQUEST:
      return { ...state, loading: true };
    case PROFILE_OF_LOGGED_IN_USER_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case PROFILE_OF_LOGGED_IN_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
// Create a sample profile
export const profileCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_CREATE_REQUEST:
      return { ...state, loading: true };
    case PROFILE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        profile: action.payload,
      };
    case PROFILE_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case PROFILE_CREATE_RESET:
      return {};
    default:
      return { ...state };
  }
};

// UPdate profile
export const profileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        profile: action.payload,
      };
    case PROFILE_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case PROFILE_UPDATE_RESET:
      return { profile: {} };

    default:
      return { ...state };
  }
};
//Delete User
export const profileDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_DELETE_REQUEST:
      return { ...state, loading: true };
    case PROFILE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case PROFILE_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
//Delete REVIEW
export const profileDeleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_DELETE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case PROFILE_DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case PROFILE_DELETE_REVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
// Verify profile qualifications
export const profileVerifyQualificationReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_VERIFY_QUALIFICATION_REQUEST:
      return { ...state, loading: true };
    case PROFILE_VERIFY_QUALIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case PROFILE_VERIFY_QUALIFICATION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
