import React from "react";
import { mountWrap } from "../../tests/setup/contextWrap";

import FilmCard from "./filmCard";

const film = {
  title: "Mission Impossible 2",
  description: "This mission is really impossible ",
  avatar:
    "https://m.odeon.co.uk/_uploads/asset_management/220x320_a550f1b2714231008886b678ab0bb150.jpg",
  _id: "5bb5bf0495afdf31c4b78426"
};

describe("FilmCard view", () => {
  it("should render correctly", () => {
    const filmCard = mountWrap(<FilmCard film={film} />);

    expect(filmCard.prop("film")).toBeDefined();

    expect(filmCard).toMatchSnapshot();
  });
});
