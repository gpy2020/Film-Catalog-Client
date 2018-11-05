import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import FilmList from "./FilmsListContainer";
import { films } from "../tests/films";
import { mountWrap } from "../tests/setup/contextWrap";

describe("FilmList container", () => {
  const initialState = {
    catalog: {
      pageName: "films",
      user: {
        email: "vistrible@mail.ru",
        password:
          "$2b$10$g5wP4f.RvVV1Rv0UQ0TUxOGQGetndsCC.7R.mEGU44AtsJa4XLNGe",
        username: "vistrible"
      },
      films: films,
      isLoading: false
    }
  };
  let wrapper, store;
  const mockStore = configureStore([thunk]);

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mountWrap(<FilmList store={store} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
