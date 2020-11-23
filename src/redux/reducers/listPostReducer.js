import * as actions from "../actionTypes/actionTypes";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const listPostReducer = (state = initialState, action) => {

  switch (action.type) {
    case actions.GET_POSTS_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };

    case actions.GET_POSTS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.response.finalData,
        totalpages:action.payload.response.totalPages,
        isError: false,
        isSuccess: true,
      };
    case actions.GET_POSTS_LIST_ERROR:
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

export default listPostReducer;
