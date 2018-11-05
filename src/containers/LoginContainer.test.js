import React from "react";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";

import Login from "./LoginContainer";

describe("Login container", () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<Login store={store} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
