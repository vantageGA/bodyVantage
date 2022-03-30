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
} from './reducers/profileReducers';

import {
  userAdminReviewersDetailsReducer,
  userReviewLoginReducer,
  userReviewIdReducer,
  userReviewerRegistrationReducer,
  createReviewReducer,
  adminReviewerDeleteReducer,
} from './reducers/userReviewReducer';

import { cookiesReducer } from './reducers/cookiesReducer';

const reducer = combineReducers({
  cookies: cookiesReducer,
  contactForm: contactFormReducer,
  users: usersReducer,
  userLogin: userLoginReducer,
  userRegistration: userRegistrationReducer,
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
  userReviewLogin: userReviewLoginReducer,
  userReviewId: userReviewIdReducer,
  userReviewerRegistration: userReviewerRegistrationReducer,
  userAdminReviewersDetails: userAdminReviewersDetailsReducer,
  adminReviewerDelete: adminReviewerDeleteReducer,
  createReview: createReviewReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const middleware = [thunk];

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
