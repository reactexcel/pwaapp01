import { combineReducers } from "redux";
import listPostReducer from "./listPostReducer";
import addPostReducer from "./addPostReducer";
import imageReducer from './imagesReducer';
const rootReducer = combineReducers({
  PostListstatus: listPostReducer,
  AddPoststatus: addPostReducer,
  Imagestatus:imageReducer
});

export default rootReducer;
