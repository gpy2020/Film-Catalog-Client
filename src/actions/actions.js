import * as actionTypes from "./actionTypes";
import axios from "axios";

export function setCategories(categories) {
  return { type: actionTypes.SET_CATEGORIES, payload: categories };
}

export function setUser(user) {
  return { type: actionTypes.SET_USER, payload: user };
}

export function setCurrentPage(pageName) {
  return { type: actionTypes.SET_CURRENT_PAGE, payload: pageName };
}

export function removeUser() {
  return { type: actionTypes.REMOVE_USER };
}

export function loadFilmsStart() {
  return { type: actionTypes.LOAD_FILMS_START };
}

export function loadFilmsReset() {
  return { type: actionTypes.LOAD_FILMS_RESET };
}

export function loadFilmsSuccess(films) {
  return { type: actionTypes.LOAD_FILMS_SUCCESS, payload: films };
}

export function loadFilmsFail(err) {
  return { type: actionTypes.LOAD_FILMS_FAIL, payload: err };
}

export function loadFilmList(url, currentPage, films) {
  return dispatch => {
    let isRebuilded = false;
    if (currentPage === 0) {
      isRebuilded = true;
      dispatch(loadFilmsReset());
    }
    dispatch(loadFilmsStart());
    axios
      .get(url)
      .then(res => {
        console.log(`loaded page: ${currentPage}`);
        // const newFilms = films;
        const newFilms = isRebuilded ? [] : films;
        newFilms.push(...res.data);
        dispatch(loadFilmsSuccess(newFilms));
      })
      .catch(err => {
        console.log(err);
        dispatch(loadFilmsFail(err));
      });
  };
}
