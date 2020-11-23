import * as actions from "../actionTypes/actionTypes";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const addPostReducer = (state = initialState, action) => {

  switch (action.type) {
    case actions.POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };

    case actions.POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.response,
        isError: false,
        isSuccess: true,
      };
    case actions.POST_ERROR:
      return {
        ...state,
        isLoading: false,
        data: action.payload.error,
        isError: true,
        isSuccess: false,
      };
    default:
      return state;
  }
};

export default addPostReducer;
