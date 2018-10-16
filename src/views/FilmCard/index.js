import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./style";
import { Link } from "react-router-dom";

function filmCard(props) {
  const { classes } = props;
  return (
    <Link to={`/films/${props.film._id}`} className={classes.link}>
      <Card className={classes.card} onClick={props.handleClick}>
        <CardContent>
          <img src={props.film.avatar} className={classes.imageContainer} />
          <Typography
            gutterBottom
            variant="headline"
            component="h2"
            className={classes.cardText}
          >
            {props.film.title}
          </Typography>
          <Typography component="p" className={classes.cardText}>
            {props.film.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
export default withStyles(styles)(filmCard);
