import React from "react";

import { render } from "@testing-library/react";

import Intro from "../components/Intro";
describe("</Intro>", () => {
  it(`Renders without crashing`, () => {
    const { getByText } = render(<Intro />);
    const playText = getByText(/start game./);
    expect(playText).toBeInTheDocument();
  });
});
