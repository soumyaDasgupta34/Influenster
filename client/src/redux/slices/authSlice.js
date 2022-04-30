import { createSlice } from "@reduxjs/toolkit";

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
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      return response;
    };
    const response = await sendRequest();
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
    const sendRequest = async () => {
      const response = await fetch(
        "http://localhost:8000/api/v1/user/registerUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, password, userName }),
        }
      );
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    };
    const { accessToken, userId } = await sendRequest();
    localStorage.setItem("token", accessToken);
    localStorage.setItem("userId", userId);
    dispatch(login());
  };
};

export const getUser = (userId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/user/${userId}`,
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
      return responseJson;
    };
    const response = await sendRequest();
    dispatch(updateFeed(response.data));
  };
};

export const changeAvatar = (avatar) => {
  return async (dispatch) => {
    console.log("Inside dispatch");
    const sendRequest = async () => {
      const formData = new FormData();
      formData.append("avatar", avatar);
      const options = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await fetch(
        "http://localhost:8000/api/v1/user/changeAvatar",
        options
      );
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    };
    await sendRequest();
    dispatch(avatarChangeAction());
  };
};

export const followUser = (userId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/user/${userId}/follow`,
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
    await sendRequest();
    dispatch(followChangeAction());
  };
};

export const unfollowUser = (userId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/user/${userId}/unfollow`,
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
    dispatch(followChangeAction());
  };
};

export const searchUser = (query) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/user/search/${query}`,
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
