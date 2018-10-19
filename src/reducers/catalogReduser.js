import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentPage: "films",
  loading: false,
  error: false,
  films: [],
  categories: [],
  user: { email: "", password: "" }
};

function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_FILMS_RESET: {
      return { ...state, films: [], loading: false };
    }

    case actionTypes.SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.payload };
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
      console.log(action.payload);
      return { ...state, user: action.payload };
    }

    case actionTypes.REMOVE_USER: {
      console.log(state.user);
      return { ...state, user: { email: "", password: "" } };
    }

    default: {
      return state;
    }
  }
}
export default catalogReducer;
