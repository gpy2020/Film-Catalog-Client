import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./style";
import FilmCardContainer from "../../containers/FilmCardContainer";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

function filmList(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      {/* <ExpansionPanel className={classes.expansionCategories}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Categories</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.categoryList}>
          <Link to="/films" className={classes.link}>
            <hr className={classes.divider} />
            <p className={classes.title}>All</p>
          </Link>
          {props.categories.map((category, i) => {
            return (
              <Link
                to={`/films/categories/${category._id}`}
                key={i}
                className={classes.link}
              >
                <hr className={classes.divider} />
                <p className={classes.title}>{category.title}</p>
              </Link>
            );
          })}
        </ExpansionPanelDetails>
      </ExpansionPanel> */}
      <select onChange={props.onChangeCategory}>
        <option value="All">select category</option>
        {props.categories.map(category => {
          return (
            <option value={category._id} key={category._id}>
              {category.title}
            </option>
          );
        })}
      </select>
      <div className={classes.cardContainer}>
        {props.films.map((film, id) => {
          return <FilmCardContainer film={film} key={id} />;
        })}
      </div>
    </React.Fragment>
  );
}
export default withStyles(styles)(filmList);
