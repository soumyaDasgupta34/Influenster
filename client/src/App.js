import React from "react";
import LogInSignUpHome from "./components/LogInSignUpHome";
import Home from "./container/Home";
import Signup from "./container/Signup";
import Navbar from "./components/Navbar";
import Logout from "./container/Logout";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";

import ProfileMeContainer from "./ui/ProfileMeContainer";
import Login from "./container/Login";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      {token && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated && !token ? <Login /> : <Home />}
        />
        <Route path="/signUp" element={<Signup />} />
        <Route
          path="/profile/me"
          element={
            <ProtectedRoute token={token}>
              <ProfileMeContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute token={token}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
