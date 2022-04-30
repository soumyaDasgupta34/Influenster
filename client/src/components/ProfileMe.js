import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux/slices/authSlice";
import Spinner from "./Spinner";
import Button from "@mui/material/Button";
import { changeAvatar } from "../redux/slices/authSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PostGrid from "./PostGrid";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const ProfileMe = () => {
  const userId = localStorage.getItem("userId");
  const [open, setOpen] = useState(false);
  const { data, isLoading, avatarChange } = useSelector((state) => state.auth);
  const { likeChange } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState();
  const { userName, avatar, followers, following, posts } = data;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = () => {
    dispatch(changeAvatar(selectedFile));
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getUser(userId));
  }, [likeChange, avatarChange]);
  return (
    <Grid style={{ paddingTop: "100px" }}>
      {isLoading ? (
        <Grid xs={4} align="center" style={{ transform: `translate(0%, 50%)` }}>
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
                  onClick={handleClickOpen}
                >
                  {" "}
                  <AddAPhotoIcon
                    fontSize="small"
                    style={{ marginRight: "5px" }}
                  />{" "}
                  <Typography variant="h7" style={{ textTransform: "none" }}>
                    Change Avatar
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
                    <Typography variant="h6">{followers.length}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <div>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                  <DialogContentText>Upload new image</DialogContentText>
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleUpload}>Upload</Button>
                </DialogActions>
              </Dialog>
            </div>
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
  );
};

export default ProfileMe;
