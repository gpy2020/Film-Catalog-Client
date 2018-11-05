import React from "react";

import Wrapper from "./index";
import { mountWrap } from "../../tests/setup/contextWrap";

describe("Wrapper view", () => {
  const wrappedMount = () => mountWrap(<Wrapper />);

  it("should render correctly", () => {
    const wrapper = wrappedMount();

    expect(wrapper).toMatchSnapshot();
  });
});
