import * as actions from "../actionTypes/actionTypes";
import { ImageSuccess,ImageError} from "../actions/actions";
import { call, put,takeEvery } from "redux-saga/effects";
import { BASE_URL } from "../../services/api";
import axios from "axios";

export function* imageRequestSaga(action) {

    const id=action.payload
  try {
    let response = yield call(
      axios.get,
      `${BASE_URL}/images/${id}`);

    let data = response.data;

    if (data) {
      yield put(ImageSuccess({ response: data }));
    } else {
      yield put(ImageError({ error: true }));
    }
  } catch (error) {
    yield put(ImageError({ error: error }));
  }
}

export function* imagesSaga() {
  yield takeEvery(actions.IMAGE_REQUEST, imageRequestSaga);
}
