import { COOKIES_REQUEST, COOKIES_SUCCESS } from '../constants/cookiesConstant';

export const cookiesAction = () => async (dispatch) => {
  dispatch({
    type: COOKIES_REQUEST,
  });

  dispatch({
    type: COOKIES_SUCCESS,
    success: true,
  });
};
