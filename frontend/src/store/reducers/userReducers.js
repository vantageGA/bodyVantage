import {
  USERS_FAILURE,
  USERS_REQUEST,
  USERS_RESET,
  USERS_SUCCESS,
  USER_ADD_REMOVE_ADMIN_FAILURE,
  USER_ADD_REMOVE_ADMIN_REQUEST,
  USER_ADD_REMOVE_ADMIN_SUCCESS,
  USER_DELETE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_FULL_DETAILS_BY_ID_FAILURE,
  USER_FULL_DETAILS_BY_ID_REQUEST,
  USER_FULL_DETAILS_BY_ID_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants';

//Get all user details
export const usersReducer = (state = { userProfiles: [] }, action) => {
  switch (action.type) {
    case USERS_REQUEST:
      return { ...state, loading: true };
    case USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfiles: action.payload,
      };
    case USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case USERS_RESET:
      return { userProfiles: [] };
    default:
      return { ...state };
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return { ...state };
  }
};

export const userRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        success: true,
        error: null,
      };
    case USER_REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case USER_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return { ...state };
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return { userInfo: {} };

    default:
      return { ...state };
  }
};

export const userProfileByIdReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_FULL_DETAILS_BY_ID_REQUEST:
      return { ...state, loading: true };
    case USER_FULL_DETAILS_BY_ID_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case USER_FULL_DETAILS_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
//Delete User
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { ...state, loading: true };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case USER_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};

// Add OR REmove asADMIN
export const userAddRemoveAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_REMOVE_ADMIN_REQUEST:
      return { ...state, loading: true };
    case USER_ADD_REMOVE_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case USER_ADD_REMOVE_ADMIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
