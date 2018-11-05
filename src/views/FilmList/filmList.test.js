import React from "react";
import { shallow } from "enzyme";

import Filmlist from "./index";

import { films } from "../../tests/films";

describe("FilmList view", () => {
  it("should render correctly", () => {
    const filmList = shallow(<Filmlist films={films} />);

    expect(filmList).toMatchSnapshot();
  });
});
