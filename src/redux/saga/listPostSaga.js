import * as actions from "../actionTypes/actionTypes";
import { PostListSuccess,PostListError} from "../actions/actions";
import { takeLatest, call, put } from "redux-saga/effects";
import {BASE_URL} from '../../services/api'
import axios from "axios";

export function* listPosts(action) {
  try {
  const page=action.payload

    let response = yield call(
      axios.get,
      `${BASE_URL}/image/${page||1}`,

    );
    let data = response.data;
    if (data) {
      yield put(PostListSuccess({ response: data }));

    } else {
      yield put(PostListError({ error: true }));
    }
  } catch (error) {
    yield put(PostListError({ error: error }));
  }
}

export function* listPostsSaga() {
  yield takeLatest(actions.GET_POSTS_LIST_REQUEST, listPosts);
}
