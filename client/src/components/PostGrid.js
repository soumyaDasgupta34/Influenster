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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const PostGrid = ({ data }) => {
  const { _id, avatar, userName, text, createdAt, image, likes } = data;
  console.log(likes);
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.post);
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
  };
  useEffect(() => {
    if (likes.includes(localStorage.getItem("userId"))) {
      setIsLike(true);
    }
  }, [likes]);
  const onLikeClickHandler = () => {
    if (!isLike) {
      setLikeCount((prevState) => prevState + 1);
      dispatch(likePost(_id));
      setIsLike(true);
    } else {
      setLikeCount((prevState) => prevState - 1);
      dispatch(unlikePost(_id));
      setIsLike(false);
    }
  };
  const handleExpandClick = () => {
    dispatch(getComments(_id));
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={`http://localhost:8000/${avatar}`}
          ></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={userName}
        subheader={new Date(createdAt).toLocaleString()}
      />
      <CardMedia
        component="img"
        height="94"
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
          <Grid container justifyContent="space-around">
            <Grid item xs={7}>
              <TextField
                type="text"
                value={newComment}
                placeholder="Your comment"
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item>
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
    </Card>
  );
};

export default PostGrid;
