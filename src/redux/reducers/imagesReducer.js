import * as actions from "../../redux/actionTypes/actionTypes";

const intialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data:[]
};

const imageReducer = (state = intialState, action) => {


  switch (action.type) {
    case actions.IMAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };

    case actions.IMAGE_SUCCESS:
      const newData=[...state.data,action.payload.response.finalData];

      return {
        ...state,
        isLoading: false,
        data: newData,
        isError: false,
        isSuccess: true,
      };
    case actions.IMAGE_ERROR:
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

export default imageReducer;
