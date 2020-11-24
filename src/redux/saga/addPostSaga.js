import * as actions from "../actionTypes/actionTypes";
import { PostSuccess, PostError ,PostListRequest} from "../actions/actions";
import { call, put, takeEvery } from "redux-saga/effects";
import { BASE_URL } from "../../services/api";
import axios from "axios";

export function* addPost(action) {
 const newPosts=JSON.parse(localStorage.getItem('newPost'))||[]
 const posts=[action.payload,...newPosts]

  try {
    let response = yield call(
      axios.post,
      `${BASE_URL}/upload-avatar`,
      action.payload
    );

    let data = response.data;

    if (data) {
      yield put(PostSuccess({ response: data }));
      localStorage.removeItem('newPost')
      yield put(PostListRequest())
    } else {
      yield put(PostError({ error: true }));
    }
  } catch (error) {
    localStorage.setItem('newPost',JSON.stringify(posts))
    yield put(PostError({ error: error }));
  }
}

export function* addPostsSaga() {
  yield takeEvery(actions.POST_REQUEST, addPost);
}
