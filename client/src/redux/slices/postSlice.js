import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";

const initialState = {
  isLoading: true,
  data: [],
  comments: {},
  userPosts: [],
  likeChange: true,
  commentChange: true,
  postChange: true,
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
  },
});

export const getPosts = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "http://localhost:8000/api/v1/post/getAllPost",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );
      const responseJson = await response.json();
      //   console.log(response.status);
      if (response.status === 401) {
        dispatch(logout());
      }
      return responseJson.data;
    };
    const data = await sendRequest();
    dispatch(updateFeed(data));
  };
};

export const createPost = (text, image) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("text", text);
      const options = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await fetch(
        "http://localhost:8000/api/v1/post/addPost",
        options
      );
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    };
    await sendRequest();
    dispatch(createPostAction());
  };
};

export const likePost = (id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8000/api/v1/post/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    };
    await sendRequest();
    dispatch(likePostAction());
  };
};

export const unlikePost = (id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8000/api/v1/post/unlike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    };
    await sendRequest();
    dispatch(likePostAction());
  };
};

export const getComments = (postId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      console.log(postId);
      const response = await fetch(
        `http://localhost:8000/api/v1/comment/${postId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );
      const responseJson = await response.json();
      return responseJson.data;
    };
    const comments = await sendRequest();
    dispatch(showComments({ comments, postId }));
  };
};

export const addComment = (postId, content) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "http://localhost:8000/api/v1/comment/addComment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
          body: JSON.stringify({ postId, content }),
        }
      );
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    };
    const response = await sendRequest();
    console.log(response.data);
    dispatch(newComment(response.data));
    // dispatch(commentChangeAction());
  };
};

export const getUserPost = (userId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/post/userId/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );
      const responseJson = await response.json();
      return responseJson;
    };
    const response = await sendRequest();
    dispatch(findUserPosts(response.data));
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/post/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );
      const responseJson = await response.json();
      return responseJson;
    };
    await sendRequest();
    dispatch(createPostAction());
  };
};

export const deleteComment = (postId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/comment/${postId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );
      const responseJson = await response.json();
      return responseJson;
    };
    await sendRequest();
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
} = actions;
export default reducer;
