export const logInApi = async (email, password) => {
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

export const signUpApi = async (email, password, userName) => {
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
  return responseJson;
};

export const getUserApi = async (userId) => {
  const response = await fetch(`http://localhost:8000/api/v1/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  });
  return response;
};

export const changeAvatarApi = async (avatar) => {
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
  return responseJson;
};

export const followUserApi = async (userId) => {
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

export const unfollowUserApi = async (userId) => {
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

export const searchUserApi = async (query) => {
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
