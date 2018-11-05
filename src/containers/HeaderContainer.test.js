import React from "react";
import configureStore from "redux-mock-store";

import Header from "./HeaderContainer";
import { mountWrap } from "../tests/setup/contextWrap";

describe("Header container", () => {
  const initialState = {
    catalog: {
      currentPage: "Films",
      user: {
        email: "vistrible@mail.ru",
        password:
          "$2b$10$g5wP4f.RvVV1Rv0UQ0TUxOGQGetndsCC.7R.mEGU44AtsJa4XLNGe",
        username: "vistrible"
      }
    }
  };

  const mockStore = configureStore();
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mountWrap(<Header store={store} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
