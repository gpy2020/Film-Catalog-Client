import React from "react";
import FilmCardContainer from "../../containers/FilmCardContainer";
import "./style.css";

function filmList(props) {
  const { classes } = props;
  return (
    <div>
      <select onChange={props.onChangeCategory} value={props.category}>
        <option value="All">select category</option>
        {props.categories.map(category => {
          return (
            <option value={category._id} key={category._id}>
              {category.title}
            </option>
          );
        })}
      </select>
      <select onChange={props.onChangeSorting} value={props.sortBy}>
        <option value="All">sort by</option>
        <option value="title">title</option>
        <option value="rating">rating</option>
      </select>
      <div className="cardContainer">
        {props.films.map((film, id) => {
          return <FilmCardContainer film={film} key={id} />;
        })}
      </div>
    </div>
  );
}
export default filmList;
