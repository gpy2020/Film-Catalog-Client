import * as actionTypes from "../actions/actionTypes";
import { cloneDeep } from "lodash";

const initialState = {
  loading: false,
  error: false,
  films: [],
  categories: [],
  user: { email: "", password: "" }
};

function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_FILMS_RESET: {
      // console.log(state.films);
      return { ...state, films: [], loading: false };
    }

    case actionTypes.LOAD_FILMS_START: {
      return { ...state, loading: true };
    }

    case actionTypes.LOAD_FILMS_SUCCESS: {
      return { ...state, films: action.payload, loading: false };
    }

    case actionTypes.LOAD_FILMS_FAIL: {
      return { ...state, error: action.payload };
    }

    case actionTypes.SET_CATEGORIES: {
      return { ...state, categories: action.payload };
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
