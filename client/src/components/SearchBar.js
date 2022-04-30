import React from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import ClearIcon from "@mui/icons-material/Clear";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { searchUser } from "../redux/slices/authSlice";
import ListItemAvatar from "@mui/material/ListItemAvatar";

function SearchBar() {
  const dispatch = useDispatch();
  const { queryData } = useSelector((state) => state.auth);
  const [inputQuery, setInputQuery] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const naviagate = useNavigate();

  const findUser = (userId) => {
    naviagate(`/profile/${userId}`);
  };

  const handleInputChange = (e) => {
    setInputQuery(e.target.value);
  };
  const onClearHadler = () => {
    setInputQuery("");
  };
  useEffect(() => {
    dispatch(searchUser(inputQuery));
  }, [inputQuery]);

  useEffect(() => {
    setSearchRes(queryData);
  }, [queryData]);
  return (
    <>
      <Paper component="form" square elevation={0}>
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          value={inputQuery}
          onChange={handleInputChange}
          placeholder="Search User"
          autocomplete="off"
          inputProps={{ "aria-label": "search instruments" }}
        />
        {inputQuery.length ? (
          <IconButton aria-label="search" onClick={onClearHadler}>
            <ClearIcon />
          </IconButton>
        ) : (
          ""
        )}
      </Paper>
      <Divider light={true} />

      <List>
        {searchRes ? (
          <List>
            <ListItem
              disableGutters
              onClick={() => {
                findUser(searchRes._id);
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={`http://localhost:8000/${searchRes.avatar}`}
                ></Avatar>
              </ListItemAvatar>
              <ListItemText>{searchRes.userName}</ListItemText>
            </ListItem>
          </List>
        ) : (
          ""
        )}
      </List>
    </>
  );
}

export default SearchBar;
