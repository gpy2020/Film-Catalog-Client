import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

import Login from "./login";

const errors = {
  email: "",
  password: "",
  serverErrors: ""
};

const props = {
  formErrors: errors,
  username: "",
  password: "",
  email: ""
};

describe("Login view", () => {
  it("Should render correctly", () => {
    const login = mount(<Login {...props} />);

    expect(login.prop("email")).toBeDefined();
    expect(login.prop("password")).toBeDefined();
    expect(login.prop("username")).toBeDefined();
    expect(login.prop("formErrors")).toBeDefined();

    expect(toJson(login)).toMatchSnapshot();
  });
});
