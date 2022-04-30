import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { getPosts } from "../redux/slices/postSlice";
import Post from "../components/Post";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createPost } from "../redux/slices/postSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Typography from "@mui/material/Typography";
import SearchBar from "../components/SearchBar";
import Grid from "@mui/material/Grid";

const Home = () => {
  const { isLoading, data, likeChange, postChange } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = () => {
    dispatch(createPost(name, selectedFile));
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, likeChange, postChange]);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid
          // xs={12}
          align="center"
          // style={{ transform: `translate(0%, 50%)` }}
        >
          <SearchBar />
          <div>
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
                Add Post
              </Typography>
            </Button>
          </div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Post</DialogTitle>
            <DialogContent>
              <DialogContentText>Caption</DialogContentText>
              <TextField
                variant="standard"
                label="Describe your post"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button variant="contained" component="label" color="primary">
                {" "}
                <AddAPhotoIcon fontSize="small" />{" "}
                <Typography
                  variant="h7"
                  style={{ textTransform: "none", marginRight: "5px" }}
                >
                  Upload a file
                </Typography>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  hidden
                />
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleUpload}>Upload</Button>
            </DialogActions>
          </Dialog>
          <div>
            {data && data.map((post) => <Post key={post._id} data={post} />)}
          </div>
        </Grid>
      )}
    </div>
  );
};

export default Home;
