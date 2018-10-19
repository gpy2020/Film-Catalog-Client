import React from "react";

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

import "./style.css";

const filmInfo = props => {
  const disqusShortname = "filmCatalog";
  const disqusConfig = {
    url: `http://localhost:3001/api/films/${props.filmID}`,
    identifier: props.filmID,
    title: props.film.title
  };

  return (
    <div className="root">
      <div className="film">
        <div className="head">
          <img src={props.film.avatar} className="filmImage" />
          <div className="head__info">
            <h2>{props.film.title}</h2>
            <h3>Rating: {props.film.rating}</h3>
            <div className="star_rating__wrap">
              <input
                className="star_rating__input"
                id="star-rating-5"
                type="radio"
                name="rating"
                value="5"
                onChange={props.onClickMark}
                checked={props.userMark == "5"}
              />
              <label
                className={`star_rating__ico fa fa-star-o`}
                htmlFor="star-rating-5"
                title="5 out of 5 stars"
              />
              <input
                className="star_rating__input"
                id="star-rating-4"
                type="radio"
                name="rating"
                value="4"
                onChange={props.onClickMark}
                checked={props.userMark == "4"}
              />
              <label
                className={`star_rating__ico fa fa-star-o`}
                htmlFor="star-rating-4"
                title="4 out of 5 stars"
              />
              <input
                className="star_rating__input"
                id="star-rating-3"
                type="radio"
                name="rating"
                value="3"
                onChange={props.onClickMark}
                checked={props.userMark == "3"}
              />
              <label
                className={`star_rating__ico fa fa-star-o`}
                htmlFor="star-rating-3"
                title="3 out of 5 stars"
              />
              <input
                className="star_rating__input"
                id="star-rating-2"
                type="radio"
                name="rating"
                value="2"
                onChange={props.onClickMark}
                checked={props.userMark == "2"}
              />
              <label
                className={`star_rating__ico fa fa-star-o`}
                htmlFor="star-rating-2"
                title="2 out of 5 stars"
              />
              <input
                className="star_rating__input"
                id="star-rating-1"
                type="radio"
                name="rating"
                value="1"
                onChange={props.onClickMark}
                checked={props.userMark == "1"}
              />
              <label
                className={`star_rating__ico fa fa-star-o`}
                htmlFor="star-rating-1"
                title="1 out of 5 stars"
              />
            </div>
            <div className="shareButtonsContainer">
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
        <div className="tabs">
          <button
            value={0}
            onClick={props.handleChange}
            className={props.value == 0 ? "active" : ""}
          >
            DESCRIPTION
          </button>
          <button
            value={1}
            onClick={props.handleChange}
            className={props.value == 1 ? "active" : ""}
          >
            GALERY
          </button>
          <button
            value={2}
            onClick={props.handleChange}
            className={props.value == 2 ? "active" : ""}
          >
            COMMENTS
          </button>
        </div>
        <div className="tabContainer">
          {props.value == 0 && (
            <div className="description">
              <p>{props.film.description}</p>
            </div>
          )}
          {props.value == 1 && (
            <div className="galery">
              {props.film.galery.map((image, i) => {
                return <img src={image} key={i} className="galery__image" />;
              })}
            </div>
          )}
          {props.value == 2 && (
            <div className="comments">
              <Disqus.DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
                width="100px"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default filmInfo;
