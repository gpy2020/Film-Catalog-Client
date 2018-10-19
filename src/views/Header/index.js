import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./style";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";

function header(props) {
  const { classes } = props;
  console.log(props.menu);
  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.infoField}>
            <Typography
              variant="title"
              color="inherit"
              className={classes.title}
            >
              {props.pageName.toUpperCase()}
            </Typography>

            <Button color="inherit">
              <Link to="/films" className={classes.link}>
                <Typography className={classes.buttonText}>Catalog</Typography>
              </Link>
            </Button>
          </div>
          <div className={classes.userField}>
            <div className={classes.searchInput}>
              <input placeholder="Search..." onChange={props.onSearch} />
              <SearchIcon className={classes.searchIcon} aria-hidden="true" />
            </div>
            {!props.user.username && (
              <Button color="inherit" className={classes.navButtons}>
                <Link to="/login" className={classes.link}>
                  <Typography className={classes.buttonText}>Login</Typography>
                </Link>
              </Button>
            )}
            {props.user.username && (
              <React.Fragment>
                <Button
                  aria-owns={props.menu ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={props.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                  <Typography color="inherit">{props.user.username}</Typography>
                </Button>
                <Menu
                  // className={classes.menu}
                  id="menu-appbar"
                  anchorEl={props.anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                  }}
                  open={props.menu}
                  onClose={props.handleClose}
                >
                  <MenuItem onClick={props.handleClose}>View Profile</MenuItem>
                  <MenuItem onClick={props.onLogout}>Logout</MenuItem>
                </Menu>
              </React.Fragment>
              // <Button
              //   variant="contained"
              //   color="primary"
              //   onClick={props.onLogout}
              //   className={classes.logoutButton}
              // >
              //   LOGOUT
              // </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withStyles(styles)(header);
