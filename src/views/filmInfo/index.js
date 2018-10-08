import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./style";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Disqus from "disqus-react";
import {
  VKShareButton,
  VKIcon,
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  GooglePlusShareButton,
  GooglePlusIcon
} from "react-share";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function filmInfo(props) {
  const { classes } = props;

  const disqusShortname = "filmCatalog";
  const disqusConfig = {
    url: `http://localhost:3001/api/films/${props.filmID}`,
    identifier: props.filmID,
    title: props.film.title
  };

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
              <h3>Rating: {props.film.rating}</h3>
              <div className="star-rating">
                <div className={classes.star_rating__wrap}>
                  <input
                    className={classes.star_rating__input}
                    id="star-rating-5"
                    type="radio"
                    name="rating"
                    value="5"
                    onChange={props.onClickMark}
                    checked={props.userMark == "5"}
                  />
                  <label
                    className={`${classes.star_rating__ico} fa fa-star-o`}
                    htmlFor="star-rating-5"
                    title="5 out of 5 stars"
                  />
                  <input
                    className={classes.star_rating__input}
                    id="star-rating-4"
                    type="radio"
                    name="rating"
                    value="4"
                    onChange={props.onClickMark}
                    checked={props.userMark == "4"}
                  />
                  <label
                    className={`${classes.star_rating__ico} fa fa-star-o`}
                    htmlFor="star-rating-4"
                    title="4 out of 5 stars"
                  />
                  <input
                    className={classes.star_rating__input}
                    id="star-rating-3"
                    type="radio"
                    name="rating"
                    value="3"
                    onChange={props.onClickMark}
                    checked={props.userMark == "3"}
                  />
                  <label
                    className={`${classes.star_rating__ico} fa fa-star-o`}
                    htmlFor="star-rating-3"
                    title="3 out of 5 stars"
                  />
                  <input
                    className={classes.star_rating__input}
                    id="star-rating-2"
                    type="radio"
                    name="rating"
                    value="2"
                    onChange={props.onClickMark}
                    checked={props.userMark == "2"}
                  />
                  <label
                    className={`${classes.star_rating__ico} fa fa-star-o`}
                    htmlFor="star-rating-2"
                    title="2 out of 5 stars"
                  />
                  <input
                    className={`${classes.star_rating__input}`}
                    id="star-rating-1"
                    type="radio"
                    name="rating"
                    value="1"
                    onChange={props.onClickMark}
                    checked={props.userMark == "1"}
                  />
                  <label
                    className={`${classes.star_rating__ico} fa fa-star-o`}
                    htmlFor="star-rating-1"
                    title="1 out of 5 stars"
                  />
                </div>
              </div>
              <div className={classes.shareButtonsContainer}>
                <VKShareButton
                  url="https://www.kinopoisk.ru/film/723403/"
                  title={props.film.title}
                  image={props.film.avatar}
                >
                  <VKIcon size={32} round={true} />
                </VKShareButton>

                <FacebookShareButton url="https://www.kinopoisk.ru/film/723403/">
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>

                <GooglePlusShareButton url="https://www.kinopoisk.ru/film/723403/">
                  <GooglePlusIcon size={32} round={true} />
                </GooglePlusShareButton>

                <TwitterShareButton url="https://www.kinopoisk.ru/film/723403/">
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
              </div>
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
                <div style={{ width: 500 }}>
                  <Disqus.DiscussionEmbed
                    shortname={disqusShortname}
                    config={disqusConfig}
                    width="100px"
                  />
                </div>
                {props.isAuthorized === false && (
                  <p className={classes.warning}>
                    Only authorized users can leave comments
                  </p>
                )}
              </div>
            )}
          </div>
        </Paper>
      </div>
    </React.Fragment>
  );
}
export default withStyles(styles)(filmInfo);
