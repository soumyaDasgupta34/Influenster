import React from "react";
import Login from "../container/Login";
import Signup from "../container/Signup";
import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const LogInSignUpHome = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const onClickHandler = () => {
    setIsCreateAccount(true);
  };
  return !isCreateAccount ? (
    <Grid xs={12}>
      <Grid
        xs={5}
        align="center"
        sx={{
          //   width: "500px",
          transform: `translate(0%, 50%)`,
          background: "linear-gradient(to top left, #00ccff 0%, #00ffff 100%)",
          border: "1rem auto solid #66ff99",
        }}
      >
        <Login />
        <div>
          <label>Dont have an account?</label>
          <Button onClick={onClickHandler}>Create Account</Button>
        </div>
      </Grid>
    </Grid>
  ) : (
    <Signup />
  );
};

export default LogInSignUpHome;
