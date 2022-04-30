import React, { useEffect } from "react";
import { logout } from "../redux/slices/authSlice";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  console.log(isAuthenticated);
  return isAuthenticated ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <Navigate replace to="/" />
  );
};

export default Logout;
