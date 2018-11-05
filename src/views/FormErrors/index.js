import React from "react";
import "./style.css";

const FormErrors = props => {
  return (
    <div>
      {Object.keys(props.formErrors).map((fieldName, i) => {
        if (fieldName == "serverErrors") {
          return (
            <p key={i} className="errorMessage">
              {props.formErrors.serverErrors}
            </p>
          );
        } else {
          if (props.formErrors[fieldName].length > 0 && props.tabNumber === 1) {
            return (
              <p key={i}>
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

export default FormErrors;
