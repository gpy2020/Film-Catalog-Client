import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./style";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function filmInfo(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <div className={classes.fragment}>
        <Dialog
          open={props.openImage}
          onClose={props.onCloseImage}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent className={classes.dialog}>
            <img src={props.imageLink} className={classes.modalImage} />
          </DialogContent>
        </Dialog>
        <Paper className={classes.root}>
          <div className={classes.header}>
            <img src={props.film.avatar} className={classes.filmImage} />
            <div className={classes.headerInfo}>
              <h2>{props.film.title}</h2>
            </div>
          </div>
          <Tabs
            value={props.value}
            className={classes.tabs}
            onChange={props.handleChange}
          >
            <Tab label="Description" />
            <Tab label="Galery" />
            <Tab label="Comments" />
          </Tabs>
          <div className={classes.tabContainer}>
            {props.value === 0 && (
              <div className={classes.paragraph}>
                <p>{props.film.description}</p>
              </div>
            )}
            {props.value === 1 && (
              <div className={classes.galery}>
                {props.film.galery.map((image, i) => {
                  return (
                    <img
                      src={image}
                      key={i}
                      className={classes.galeryImage}
                      onClick={props.onOpenImage}
                    />
                  );
                })}
              </div>
            )}
            {props.value === 2 && (
              <div>
                {props.film.comments.map((comment, i) => {
                  return (
                    <p key={i}>{`${comment.user} : ${comment.comment}`}</p>
                  );
                })}
                <form onSubmit={props.handleComment} autoComplete="off">
                  <h2>Leave a comment</h2>
                  <TextField
                    id="comment"
                    name="comment"
                    rowsMax="4"
                    onInput={props.handleInput}
                    value={props.text}
                    disabled={!props.isAuthorized}
                    placeholder="comment film"
                  />
                  <Button type="submit" disabled={!props.isAuthorized}>
                    SEND COMMENT
                  </Button>
                  {props.isAuthorized === false && (
                    <p className={classes.warning}>
                      Only authorized users can leave comments
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        </Paper>
      </div>
    </React.Fragment>
  );
}
export default withStyles(styles)(filmInfo);
