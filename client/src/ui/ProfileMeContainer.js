import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ProfileMe from "../components/ProfileMe";

export default function ProfileMeContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <ProfileMe />
      </Container>
    </React.Fragment>
  );
}
