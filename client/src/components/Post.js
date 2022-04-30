import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getComments, likePost, unlikePost } from "../redux/slices/postSlice";
import { useSelector } from "react-redux";
import Comments from "./Comments";
import Avatar from "@mui/material/Avatar";
import { addComment } from "../redux/slices/postSlice";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { deletePost } from "../redux/slices/postSlice";

const Post = ({ data }) => {
  const { _id, avatar, userName, text, createdAt, image, user, likes } = data;
  const dispatch = useDispatch();
  const { comments, commentChange } = useSelector((state) => state.post);
  const [isLike, setIsLike] = useState(undefined);
  const [expanded, setExpanded] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [newComment, setNewComment] = useState("");
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const onChangeHandler = (event) => {
    setNewComment(event.target.value);
  };
  const onAddCommentHandler = (event) => {
    event.preventDefault();
    dispatch(addComment(_id, newComment));
    setNewComment("");
  };
  useEffect(() => {
    if (likes.includes(localStorage.getItem("userId"))) {
      setIsLike(true);
    }
  }, [likes]);
  const onLikeClickHandler = () => {
    if (!isLike) {
      setIsLike(true);
      setLikeCount((prevState) => prevState + 1);
      dispatch(likePost(_id));
    } else {
      setIsLike(false);
      setLikeCount((prevState) => prevState - 1);
      dispatch(unlikePost(_id));
    }
  };
  const handleExpandClick = () => {
    dispatch(getComments(_id));
    setExpanded(!expanded);
  };

  useEffect(() => {
    dispatch(getComments(_id));
    console.log("Post id", _id);
  }, [commentChange, expanded]);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    dispatch(deletePost(_id));
  };
  const handleMenuOpen = (event) => {
    if (user === localStorage.getItem("userId")) {
      setAnchorEl(event.currentTarget);
    }
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
    </Menu>
  );

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={`http://localhost:8000/${avatar}`}
          ></Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        title={userName}
        subheader={new Date(createdAt).toLocaleString()}
      />
      <CardMedia
        component="img"
        height="394"
        image={`http://localhost:8000/${image}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={onLikeClickHandler}>
          {likes.length > 0 && likeCount !== 0 && likeCount}
          {isLike ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteIcon />
          )}
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {(comments[_id] || []).map((comment) => (
            <Comments key={comment._id} data={comment} />
          ))}
          <Grid container justifyContent="space-between">
            <Grid item xs={7}>
              <TextField
                type="text"
                value={newComment}
                placeholder="Your comment"
                onChange={onChangeHandler}
                sx={{ width: "32rem" }}
              />
            </Grid>
            <Grid item sx={{ marginRight: "7px" }}>
              <Fab
                color="primary"
                aria-label="add"
                size="small"
                sx={{ bgcolor: "#00ccff" }}
              >
                <AddIcon onClick={onAddCommentHandler} />
              </Fab>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {renderMenu}
    </Card>
  );
};

export default Post;
