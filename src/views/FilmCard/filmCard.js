import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const filmCard = props => {
  return (
    <Link to={`/films/${props.film._id}`} className="link">
      <div className="card">
        <img src={props.film.avatar} className="imageContainer" />
        <h2 className={`cardText cardText-h2`}>{props.film.title}</h2>
        <p className={`cardText cardText-p`}>{props.film.description}</p>
      </div>
    </Link>
  );
};

export default filmCard;
