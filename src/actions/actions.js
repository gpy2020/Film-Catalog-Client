import * as actionTypes from "./actionTypes";

export function setFilms(films) {
  return { type: actionTypes.SET_FILMS, payload: films };
}

export function setCategories(categories) {
  return { type: actionTypes.SET_CATEGORIES, payload: categories };
}

export function setUser(user) {
  return { type: actionTypes.SET_USER, payload: user };
}
