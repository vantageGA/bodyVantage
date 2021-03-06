import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { contactFormReducer } from './reducers/contactFormReducers';

import {
  usersReducer,
  userLoginReducer,
  userRegistrationReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userProfileByIdReducer,
  userDeleteReducer,
  userAddRemoveAdminReducer,
  userForgotPasswordReducer,
  userUpdatePasswordReducer,
} from './reducers/userReducers';

import {
  profilesReducer,
  profilesAdminReducer,
  profileByIdReducer,
  profileOfLoggedInUserReducer,
  profileCreateReducer,
  profileUpdateReducer,
  profileDeleteReducer,
  profileVerifyQualificationReducer,
  profileDeleteReviewReducer,
  profileImagesReducer,
  profileImagesPublicReducer,
} from './reducers/profileReducers';

import {
  userAdminReviewersDetailsReducer,
  userReviewLoginReducer,
  userReviewIdReducer,
  userReviewerRegistrationReducer,
  createReviewReducer,
  adminReviewerDeleteReducer,
  userReviewersDetailsReducer,
} from './reducers/userReviewReducer';

import {
  userProfileImageReducer,
  profileImageReducer,
  profileImageDeleteReducer,
} from './reducers/imageUploadReducers';

import { cookiesReducer } from './reducers/cookiesReducer';

const reducer = combineReducers({
  cookies: cookiesReducer,
  contactForm: contactFormReducer,
  users: usersReducer,
  userLogin: userLoginReducer,
  userRegistration: userRegistrationReducer,
  userForgotPassword: userForgotPasswordReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  userDetails: userDetailsReducer,
  userProfileById: userProfileByIdReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  userAddRemoveAdmin: userAddRemoveAdminReducer,
  profiles: profilesReducer,
  profilesAdmin: profilesAdminReducer,
  profileById: profileByIdReducer,
  profileOfLoggedInUser: profileOfLoggedInUserReducer,
  profileCreate: profileCreateReducer,
  profileUpdate: profileUpdateReducer,
  profileDelete: profileDeleteReducer,
  profileVerifyQualification: profileVerifyQualificationReducer,
  profileDeleteReview: profileDeleteReviewReducer,
  profileImage: profileImageReducer,
  profileImages: profileImagesReducer,
  profileImagesPublic: profileImagesPublicReducer,
  profileImageDelete: profileImageDeleteReducer,
  userProfileImage: userProfileImageReducer,
  userReviewLogin: userReviewLoginReducer,
  userReviewId: userReviewIdReducer,
  userReviewerRegistration: userReviewerRegistrationReducer,
  userAdminReviewersDetails: userAdminReviewersDetailsReducer,
  userReviewersDetails: userReviewersDetailsReducer,
  adminReviewerDelete: adminReviewerDeleteReducer,
  createReview: createReviewReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const reviewerInfoFromStorage = localStorage.getItem('userReviewInfo')
  ? JSON.parse(localStorage.getItem('userReviewInfo'))
  : null;

const middleware = [thunk];

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
    userReviewInfo: reviewerInfoFromStorage,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
