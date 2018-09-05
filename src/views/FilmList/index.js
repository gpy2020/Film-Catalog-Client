import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./style";
import FilmCardContainer from "../../containers/FilmCardContainer";

function filmList(props) {
  const { classes } = props;
  return (
    <React.Fragment>
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
      <input type="search" placeholder="search" onChange={props.onSearch} />
      <div className={classes.cardContainer}>
        {props.films.map((film, id) => {
          return <FilmCardContainer film={film} key={id} />;
        })}
      </div>
    </React.Fragment>
  );
}
export default withStyles(styles)(filmList);
