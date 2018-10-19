import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

function header(props) {
  return (
    <div className="header">
      <div className="infoField">
        <p className="pageTitle">{props.pageName.toUpperCase()}</p>
        <Link className="link" to="/films">
          <button className="navButton">Catalog</button>
        </Link>
      </div>
      <div className="userField">
        <div className="searchInput">
          <input
            placeholder="Search..."
            className="searchField"
            onChange={props.onSearch}
          />
        </div>
        {!props.user.username && (
          <Link className="link" to="/login">
            <button className="navButton">Login</button>
          </Link>
        )}
        {props.user.username && (
          <button className={`navButton profile`} onClick={props.onLogout}>
            <img
              className="userIcon"
              src="https://png.icons8.com/ios/50/ffffff/contacts-filled.png"
            />
            {props.user.username}
          </button>
        )}
      </div>
    </div>
  );
}
export default header;
