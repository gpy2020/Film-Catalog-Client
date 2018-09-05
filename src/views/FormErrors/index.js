import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./style";

const FormErrors = props => {
  const { classes } = props;
  return (
    <div>
      {Object.keys(props.formErrors).map((fieldName, i) => {
        if (fieldName == "serverErrors") {
          return (
            <p key={i} className={classes.errorMessage}>
              {props.formErrors.serverErrors}
            </p>
          );
        } else {
          if (props.formErrors[fieldName].length > 0 && props.tabNumber === 1) {
            return (
              <p key={i} className={classes.errorMessage}>
                {" "}
                {fieldName} {props.formErrors[fieldName]}
              </p>
            );
          } else {
            return "";
          }
        }
      })}
    </div>
  );
};

export default withStyles(styles)(FormErrors);
