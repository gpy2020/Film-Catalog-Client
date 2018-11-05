import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import Header from "./header";

const user = {
  email: "vistrible@mail.ru",
  password: "$2b$10$g5wP4f.RvVV1Rv0UQ0TUxOGQGetndsCC.7R.mEGU44AtsJa4XLNGe",
  username: "vistrible",
  _id: "5b8a9d8005e7bb25ef33984c"
};

describe("Header view", () => {
  it("should render correctly", () => {
    const header = shallow(<Header pageName="Login" user={user} />);

    expect(toJson(header)).toMatchSnapshot();
  });
});
