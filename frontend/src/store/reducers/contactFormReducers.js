import {
  CONTACT_FORM_FAILURE,
  CONTACT_FORM_REQUEST,
  CONTACT_FORM_RESET,
  CONTACT_FORM_SUCCESS,
} from '../constants/contactFormConstants';

export const contactFormReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_FORM_REQUEST:
      return { ...state, loading: true };
    case CONTACT_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        payload: action.payload,
      };
    case CONTACT_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        payload: action.payload,
      };
    case CONTACT_FORM_RESET:
      return {};
    default:
      return state;
  }
};
