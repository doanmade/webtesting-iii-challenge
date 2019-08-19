// Test away
import { render } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer"; // 1: install this npm module as a dev dependency
import Display from "./Display";

describe("<Display />", () => {
  // 2. write this test
  it("matches snapshot", () => {
    const tree = renderer.create(<Display />); // generates a DOM tree

    // snapshots are a JSON representation of the DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it("Should Displays unlocked", () => {
    const { queryByText } = render(<Display />);
    expect(queryByText(/unlocked/i)).toBeTruthy();
  });
  it("Should Displays open", () => {
    const { queryByText } = render(<Display />);
    expect(queryByText(/open/i)).toBeTruthy();
  });
  it('Should "closed" and "locked" equal false', () => {
    const { queryByText } = render(<Display closed={true} locked={true} />);
    expect(queryByText(/closed/i)).toBeTruthy();
    expect(queryByText(/locked/i)).toBeTruthy();
  });
  it("Should have red-led when locked or closed", () => {
    const { queryAllByTestId } = render(
      <Display closed={true} locked={true} />
    );
    expect(queryAllByTestId("led red-led")).toBeTruthy();
  });
  it("Should have red-led when locked or closed", () => {
    const { queryAllByTestId } = render(
      <Display closed={false} locked={false} />
    );
    expect(queryAllByTestId("led green-led")).toBeTruthy();
  });
});
