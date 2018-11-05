import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

import FormErrors from "./index";

const errors = {
  email: "",
  password: "",
  serverErrors: ""
};

describe("FormErrors view", () => {
  it("should render correctly", () => {
    const formErrors = mount(<FormErrors formErrors={errors} tabNumber={1} />);

    expect(formErrors.prop("formErrors")).toBeDefined();
    expect(formErrors.prop("tabNumber")).toBeDefined();

    expect(toJson(formErrors)).toMatchSnapshot();
  });
});
