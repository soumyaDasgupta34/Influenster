import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
import {
  getPostApi,
  getMorePostApi,
  createPostApi,
  likePostApi,
  unlikePostApi,
  getCommentsApi,
  addCommentApi,
  getUserPostApi,
  deletePostApi,
  deleteCommentApi,
} from "../../api/postApiCalls";

const initialState = {
  isLoading: true,
  data: [],
  comments: {},
  userPosts: [],
  likeChange: true,
  commentChange: true,
  postChange: true,
  hasMore: true,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateFeed: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    showComments: (state, action) => {
      state.comments[action.payload.postId] = action.payload.comments;
    },
    newComment: (state, action) => {
      state.commentChange = !state.commentChange;
    },
    findUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    likePostAction: (state) => {
      state.likeChange = !state.likeChange;
    },
    commentChangeAction: (state, action) => {
      state.commentChange = !state.commentChange;
    },
    createPostAction: (state) => {
      state.postChange = !state.postChange;
    },
    getMorePostsAction: (state, action) => {
      state.data = [...state.data, ...action.payload];
      console.log(action.payload);
      if (!action.payload.length > 0) {
        state.hasMore = false;
      }
    },
  },
});

export const getPosts = () => {
  return async (dispatch) => {
    const response = await getPostApi();
    if (response.status === 401) {
      dispatch(logout());
    }
    const responseJson = await response.json();
    dispatch(updateFeed(responseJson.data));
  };
};

export const getMorePosts = (pageNumber) => {
  return async (dispatch) => {
    const response = await getMorePostApi(pageNumber);
    const responseJson = await response.json();
    if (response.status === 401) {
      dispatch(logout());
    }
    dispatch(getMorePostsAction(responseJson.data));
  };
};

export const createPost = (text, image) => {
  return async (dispatch) => {
    await createPostApi(text, image);
    dispatch(createPostAction());
  };
};

export const likePost = (id) => {
  return async (dispatch) => {
    await likePostApi(id);
    dispatch(likePostAction());
  };
};

export const unlikePost = (id) => {
  return async (dispatch) => {
    await unlikePostApi(id);
    dispatch(likePostAction());
  };
};

export const getComments = (postId) => {
  return async (dispatch) => {
    const comments = await getCommentsApi(postId);
    dispatch(showComments({ comments, postId }));
  };
};

export const addComment = (postId, content) => {
  return async (dispatch) => {
    const response = await addCommentApi(postId, content);
    dispatch(newComment(response.data));
  };
};

export const getUserPost = (userId) => {
  return async (dispatch) => {
    const response = await getUserPostApi(userId);
    dispatch(findUserPosts(response.data));
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    await deletePostApi(postId);
    dispatch(createPostAction());
  };
};

export const deleteComment = (postId) => {
  return async (dispatch) => {
    await deleteCommentApi(postId);
    dispatch(commentChangeAction());
  };
};

const { actions, reducer } = postSlice;
export const {
  updateFeed,
  showComments,
  newComment,
  findUserPosts,
  userDeletePost,
  likePostAction,
  commentChangeAction,
  createPostAction,
  getMorePostsAction,
} = actions;
export default reducer;
