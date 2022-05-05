export const getPostApi = async () => {
  const response = await fetch("http://localhost:8000/api/v1/post/getAllPost", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  });
  return response;
};

export const getMorePostApi = async (pageNumber) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/post/getAllPost?page=${pageNumber}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    }
  );
  return response;
};

export const createPostApi = async (text, image) => {
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
  return responseJson;
};

export const likePostApi = async (id) => {
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
  return responseJson;
};

export const unlikePostApi = async (id) => {
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
  return responseJson;
};

export const getCommentsApi = async (postId) => {
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

export const addCommentApi = async (postId, content) => {
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
  return responseJson;
};

export const getUserPostApi = async (userId) => {
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

export const deletePostApi = async (postId) => {
  const response = await fetch(`http://localhost:8000/api/v1/post/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  });
  const responseJson = await response.json();
  return responseJson;
};

export const deleteCommentApi = async (postId) => {
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
