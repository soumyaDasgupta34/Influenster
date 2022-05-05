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
