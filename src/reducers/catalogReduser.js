import * as actionTypes from "../actions/actionTypes";
import { cloneDeep } from "lodash";

const initialState = {
  films: [],
  categories: [],
  user: { email: "", password: "" }
};

function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES: {
      return { ...state, categories: action.payload };
    }
    case actionTypes.SET_FILMS: {
      return { ...state, films: action.payload };
    }
    case actionTypes.SET_USER: {
      return { ...state, user: action.payload };
    }
    default: {
      return state;
    }
  }
}
export default catalogReducer;
