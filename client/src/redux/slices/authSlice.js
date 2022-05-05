import { createSlice } from "@reduxjs/toolkit";
import {
  logInApi,
  signUpApi,
  getUserApi,
  changeAvatarApi,
  followUserApi,
  unfollowUserApi,
  searchUserApi,
} from "../../api/apiCalls";

const initialState = {
  isAuthenticated: undefined,
  data: {},
  isLoading: true,
  queryData: [],
  avatarChange: true,
  followChange: true,
  incorrectLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.incorrectLogin = false;
      localStorage.removeItem("token");
    },
    updateFeed: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    queryUser: (state, action) => {
      state.queryData = action.payload;
    },
    avatarChangeAction: (state) => {
      state.avatarChange = !state.avatarChange;
    },
    followChangeAction: (state) => {
      state.followChange = !state.followChange;
    },
    incorrectLogInAction: (state, action) => {
      state.incorrectLogin = true;
    },
  },
});

export const logIn = (email, password) => {
  return async (dispatch) => {
    const response = await logInApi(email, password);
    const { accessToken, userId, message } = await response.json();
    if (response.status === 201) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("userId", userId);
      dispatch(login());
    } else {
      console.log("Inside incorrect log in", message);
      dispatch(incorrectLogInAction(message));
    }
  };
};

export const signUp = (userName, email, password) => {
  return async (dispatch) => {
    const { accessToken, userId } = await signUpApi(email, password, userName);
    localStorage.setItem("token", accessToken);
    localStorage.setItem("userId", userId);
    dispatch(login());
  };
};

export const getUser = (userId) => {
  return async (dispatch) => {
    const response = await getUserApi(userId);
    if (response.status === 401) {
      dispatch(logout());
    }
    const responseJson = await response.json();
    dispatch(updateFeed(responseJson.data));
  };
};

export const changeAvatar = (avatar) => {
  return async (dispatch) => {
    await changeAvatarApi(avatar);
    dispatch(avatarChangeAction());
  };
};

export const followUser = (userId) => {
  return async (dispatch) => {
    await followUserApi(userId);
    dispatch(followChangeAction());
  };
};

export const unfollowUser = (userId) => {
  return async (dispatch) => {
    await unfollowUserApi(userId);
    dispatch(followChangeAction());
  };
};

export const searchUser = (query) => {
  return async (dispatch) => {
    const response = await searchUserApi(query);
    dispatch(queryUser(response.data));
  };
};

const { actions, reducer } = authSlice;
export const { login, logout } = actions;
export const {
  updateFeed,
  queryUser,
  avatarChangeAction,
  followChangeAction,
  incorrectLogInAction,
} = actions;
export default reducer;
