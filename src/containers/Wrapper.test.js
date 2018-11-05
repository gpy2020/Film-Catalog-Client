import React from "react";

import Wrapper from "./WrapperContainer";
import { mountWrap } from "../tests/setup/contextWrap";

describe("Wrapper container", () => {
  const wrappedMount = () => mountWrap(<Wrapper />);
  it("should render correctly", () => {
    const wrapper = wrappedMount();

    expect(wrapper).toMatchSnapshot();
  });
});
