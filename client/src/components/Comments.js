import React from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { deleteComment } from "../redux/slices/postSlice";
import { useDispatch } from "react-redux";

const Comments = ({ data }) => {
  const { avatar, content, userName, user, _id } = data;
  const dispatch = useDispatch();
  const onDeleteCommentHandler = () => {
    dispatch(deleteComment(_id));
  };

  return (
    <List sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}>
      <Grid
        container
        sx={6}
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Grid item>
          <ListItem alignItems="flex-start" sx={{ paddingLeft: "inherit" }}>
            <ListItemAvatar>
              <Avatar
                alt="Profile Picture"
                src={`http://localhost:8000/${avatar}`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={userName}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {content}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </Grid>
        {user === localStorage.getItem("userId") && (
          <Grid item>
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={onDeleteCommentHandler}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          </Grid>
        )}
      </Grid>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default Comments;
