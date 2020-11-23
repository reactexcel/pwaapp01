import { fork, all } from "redux-saga/effects";
import { addPostsSaga } from "./addPostSaga";
import { listPostsSaga } from "./listPostSaga";
import {imagesSaga} from './imageSaga';

function* watchAllSaga() {
  {
    yield all([fork(addPostsSaga), fork(listPostsSaga),fork(imagesSaga)]);
  }
}

export default watchAllSaga;
