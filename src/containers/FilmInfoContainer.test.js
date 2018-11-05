import React from "react";
import configureStore from "redux-mock-store";
import { mountWrap } from "../tests/setup/contextWrap";

import FilmInfo from "./FilmInfoContainer";

describe("FilmInfo container", () => {
  const initialState = {
    catalog: {
      user: {
        email: "vistrible@mail.ru",
        password:
          "$2b$10$g5wP4f.RvVV1Rv0UQ0TUxOGQGetndsCC.7R.mEGU44AtsJa4XLNGe",
        username: "vistrible"
      },
      isDogLoading: false,
      dogError: null,
      dogImage: "https://images.dog.ceo/breeds/husky/n02110185_12120.jpg"
    }
  };
  let store, wrapper;
  const mockStore = configureStore();

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mountWrap(<FilmInfo store={store} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
