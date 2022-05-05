import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { getPosts, getMorePosts } from "../redux/slices/postSlice";
import Post from "../components/Post";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createPost } from "../redux/slices/postSlice";
import Button from "@mui/material/Button";
import InfiniteScroll from "react-infinite-scroll-component";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Typography from "@mui/material/Typography";
import SearchBar from "../components/SearchBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Input } from "@mui/material";
import { logInApi } from "../api/apiCalls";

const Home = () => {
  const { isLoading, data, likeChange, postChange, hasMore } = useSelector(
    (state) => state.post
  );

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    if (selectedFile) {
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  }, [selectedFile]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedFile();
    setName("");
  };
  const handleUpload = () => {
    dispatch(createPost(name, selectedFile));
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, likeChange, postChange]);

  const fetchData = () => {
    dispatch(getMorePosts(pageNumber + 1));
    setPageNumber(pageNumber + 1);
  };
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
              data-testid="add-post"
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
          <Dialog
            open={open}
            onClose={handleClose}
            data-testid="add-post-modal"
          >
            {/* <DialogTitle>Add Post</DialogTitle> */}
            <DialogContent sx={{ width: "500px" }}>
              <Box padding=".5rem 0">
                <Input
                  multiline
                  rows="2"
                  disableUnderline
                  type="text"
                  placeholder="What's happening?"
                  sx={{ width: "100%" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {imageUrl && selectedFile && (
                  <Box mt={2} textAlign="center">
                    <div>Image Preview:</div>
                    <img
                      src={imageUrl}
                      alt={selectedFile.name}
                      height="200px"
                      width="300px"
                    />
                  </Box>
                )}
              </Box>
              <Button
                variant="contained"
                component="label"
                color="primary"
                sx={{ marginTop: "20px", marginLeft: "9rem" }}
              >
                {" "}
                <AddAPhotoIcon sx={{ fontSize: "18px" }} />{" "}
                <Typography
                  variant="h7"
                  style={{
                    textTransform: "none",
                    marginRight: "5px",
                    marginLeft: "10px",
                    marginTop: "5px",
                  }}
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
              <Button onClick={handleClose} data-testid="cancel-button">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={name.length === 0}
                data-testid="post-button"
              >
                Post
              </Button>
            </DialogActions>
          </Dialog>
          <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={hasMore}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {data && data.map((post) => <Post key={post._id} data={post} />)}
          </InfiniteScroll>
        </Grid>
      )}
    </div>
  );
};

export default Home;
