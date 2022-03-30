import { COOKIES_REQUEST, COOKIES_SUCCESS } from '../constants/cookiesConstant';

export const cookiesReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case COOKIES_REQUEST:
      return { ...state, loading: true };
    case COOKIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        payload: action.payload,
      };

    default:
      return state;
  }
};
