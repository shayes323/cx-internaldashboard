import {
  ClickAwayListener,
  IconButton,
  Menu,
  MenuItem,
  Select,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useContext, useState } from "react";
import { Page, stateStoreContext } from "../StateStore";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

export function MenuButton() {
  const stateStore = useContext(stateStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    setOpen((prev) => !prev);
    setAnchorEl(e.currentTarget);
  };

  const handlePublisherClick = () => {
    stateStore.Page = Page.PublisherPage;
    setAnchorEl(null);
  };

  const handleRemoteFeedClick = () => {
    stateStore.Page = Page.RemoteFeedPage;
    setAnchorEl(null);
  };

  const handleClickAway = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      {/* <ClickAwayListener onClickAway={handleClickAway}> */}
        <div>
          {open ? (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              style={{ textAlign: "left", height: "200px", width: "175px" }}
            >
              <Link to="/">
                <MenuItem onClick={handlePublisherClick}>Publishers</MenuItem>
              </Link>
              <Link to="/remotefeeds">
                <MenuItem onClick={handleRemoteFeedClick}>
                  Remote Feeds
                </MenuItem>
              </Link>
            </Menu>
          ) : null}
        </div>
      {/* </ClickAwayListener> */}
    </div>
  );
}
