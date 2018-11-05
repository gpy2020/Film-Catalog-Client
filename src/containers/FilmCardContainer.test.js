import React from "react";

import FilmCardContainer from "./FilmCardContainer";
import { mountWrap } from "../tests/setup/contextWrap";

const film = {
  galery: [
    "https://images.amcnetworks.com/ifc.com/wp-content/uploads/2016/08/Mission-Impossible-Tom-Cruise-1996-e1470430541286-800x400.jpg",
    "http://digitalspyuk.cdnds.net/18/29/980x490/landscape-1531830453-mission-impossible-fallout-poster.jpg",
    "https://images.complex.com/complex/images/c_limit%2Cw_680/fl_lossy%2Cpg_1%2Cq_auto/yf5f7pt3ngjwigdwtqvh/mission-impossible-6",
    "https://thenypost.files.wordpress.com/2015/07/mcdmiim_ec038.jpg?quality=90%26strip=all%26w=618%26h=410%26crop=1"
  ],
  _id: "5bb5bf0495afdf31c4b78426",
  title: "Mission Impossible 2",
  description: "This mission is really impossible ",
  avatar:
    "https://m.odeon.co.uk/_uploads/asset_management/220x320_a550f1b2714231008886b678ab0bb150.jpg",
  rating: 5,
  marks: [],
  comments: [],
  __v: 0
};

describe("FilmCard container", () => {
  const wrappedMount = () => mountWrap(<FilmCardContainer film={film} />);

  it("should render correctly", () => {
    const filmCard = wrappedMount();

    expect(filmCard.prop("film")).toBeDefined();

    expect(filmCard).toMatchSnapshot();
  });
});
