import {createAction} from 'redux-actions';
import * as actions from '../actionTypes/actionTypes';

export const PostListRequest=createAction(actions.GET_POSTS_LIST_REQUEST)
export const PostListSuccess=createAction(actions.GET_POSTS_LIST_SUCCESS);
export const PostListError=createAction(actions.GET_POSTS_LIST_ERROR);


export const PostRequest=createAction(actions.POST_REQUEST);
export const PostSuccess=createAction(actions.POST_SUCCESS);
export const PostError=createAction(actions.POST_ERROR)

export const ImageRequest=createAction(actions.IMAGE_REQUEST);
export const ImageSuccess=createAction(actions.IMAGE_SUCCESS);
export const ImageError=createAction(actions.IMAGE_ERROR)