import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserPost } from "../redux/slices/postSlice";
import { getUser } from "../redux/slices/authSlice";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PostGrid from "./PostGrid";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { followUser, unfollowUser } from "../redux/slices/authSlice";
import Spinner from "./Spinner";
import Container from "@mui/material/Container";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { likeChange } = useSelector((state) => state.post);
  const { data, isLoading, followChange } = useSelector((state) => state.auth);
  const [isFollow, setIsFollow] = useState(undefined);
  const { userName, avatar, followers, following, posts } = data;
  const [followerCount, setFollowerCount] = useState(0);
  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getUserPost(id));
  }, [likeChange, followChange]);

  useEffect(() => {
    if (followers && followers.includes(localStorage.getItem("userId"))) {
      setIsFollow(true);
      setFollowerCount(followers.length);
    }
  }, [followers]);

  const onFollowClickHandler = () => {
    if (!isFollow) {
      setFollowerCount((prevState) => prevState + 1);
      dispatch(followUser(id));
      setIsFollow(true);
    } else {
      setFollowerCount((prevState) => prevState - 1);
      dispatch(unfollowUser(id));
      setIsFollow(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid style={{ paddingTop: "100px" }}>
        {isLoading ? (
          <Grid
            xs={4}
            align="center"
            style={{ transform: `translate(0%, 50%)` }}
          >
            <Spinner />
          </Grid>
        ) : (
          <div>
            <Grid container spacing={2} style={{ paddingBottom: "100px" }}>
              <Grid item>
                <img
                  alt="Avatar"
                  src={`http://localhost:8000/${avatar}`}
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "100px",
                  }}
                />
              </Grid>
              <Grid item>
                <Grid item>
                  <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    onClick={onFollowClickHandler}
                  >
                    {" "}
                    <PersonAddIcon
                      fontSize="small"
                      style={{ marginRight: "5px" }}
                    />{" "}
                    <Typography variant="h7" style={{ textTransform: "none" }}>
                      {isFollow ? "Unfollow" : "Follow"}
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="h5">{userName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item>
                      <Typography variant="h6" style={{ paddingRight: "10px" }}>
                        Following
                      </Typography>
                      <Typography variant="h6">{following.length}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">Followers</Typography>
                      <Typography variant="h6">
                        {!followers ? followerCount : followers.length}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              {posts.map((post) => {
                return (
                  <Grid item xs={6}>
                    <PostGrid key={post._id} data={post} />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )}
      </Grid>
    </Container>
  );
};

export default Profile;
