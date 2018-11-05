import React from "react";
import { mount } from "enzyme";

import FilmInfo from "./filmInfo";

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

const props = {
  film: film,
  value: 0,
  isAuthorized: true,
  userMark: 5,
  filmID: "5bb5bf0495afdf31c4b78426",
  isDogLoading: false,
  dogImage:
    "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  dogError: null,
  imdbRating: 10,
  onClickMark: () => 1
};

describe("FilmInfo view", () => {
  it("should correctly render description", () => {
    const filmInfo = mount(<FilmInfo {...props} />);

    expect(filmInfo.prop("film")).toBeDefined();
    expect(filmInfo.prop("value")).toBeDefined();
    expect(filmInfo.prop("userMark")).toBeDefined();
    expect(filmInfo.prop("filmID")).toBeDefined();
    expect(filmInfo.prop("imdbRating")).toBeDefined();

    expect(filmInfo.prop("value")).toEqual(0);
    expect(filmInfo).toMatchSnapshot();
  });

  it("should correctly render galery", () => {
    const filmInfo = mount(<FilmInfo {...props} value={1} />);

    expect(filmInfo.prop("film")).toBeDefined();
    expect(filmInfo.prop("value")).toBeDefined();
    expect(filmInfo.prop("userMark")).toBeDefined();
    expect(filmInfo.prop("filmID")).toBeDefined();
    expect(filmInfo.prop("imdbRating")).toBeDefined();
    expect(filmInfo.prop("isDogLoading")).toBeDefined();
    expect(filmInfo.prop("dogImage")).toBeDefined();
    expect(filmInfo.prop("dogError")).toBeDefined();

    expect(filmInfo.prop("value")).toEqual(1);
    expect(filmInfo).toMatchSnapshot();
  });

  it("should correctly render comments", () => {
    const filmInfo = mount(<FilmInfo {...props} value={2} />);

    expect(filmInfo.prop("film")).toBeDefined();
    expect(filmInfo.prop("value")).toBeDefined();
    expect(filmInfo.prop("userMark")).toBeDefined();
    expect(filmInfo.prop("filmID")).toBeDefined();
    expect(filmInfo.prop("imdbRating")).toBeDefined();

    expect(filmInfo.prop("value")).toEqual(2);
    expect(filmInfo).toMatchSnapshot();
  });

  // it('should switch tabs on click', () => {
  //   const filmInfo = mount(<filmInfo {...props} />);

  // })
});
