// Test away
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer"; // 1: install this npm module as a dev dependency
import Controls from "./Controls";

describe("<Controls />", () => {
  // 2. write this test
  it("matches snapshot", () => {
    const tree = renderer.create(<Controls />); // generates a DOM tree

    // snapshots are a JSON representation of the DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it("should toggle locked/unlocked on button fire", () => {
    const mockFunctionLocked = jest.fn();
    const { getByText } = render(
      <Controls locked={true} closed={true} toggleLocked={mockFunctionLocked} />
    );
    fireEvent.click(getByText("Unlock Gate"));
    expect(mockFunctionLocked).toHaveBeenCalled();
  });

  it("should toggle opened/closed on button fire", () => {
    const mockFunctionClosed = jest.fn();
    const { getByText } = render(
      <Controls
        locked={false}
        closed={false}
        toggleClosed={mockFunctionClosed}
      />
    );
    fireEvent.click(getByText("Close Gate"));
    expect(mockFunctionClosed).toHaveBeenCalled();
  });

  it("Should be disabled", () => {
    const { getByText } = render(<Controls />);
    expect(getByText("Lock Gate").disabled).toBeTruthy();
  });

  it("Should be disabled", () => {
    const { getByText } = render(<Controls locked={true} closed={true} />);
    expect(getByText("Open Gate").disabled).toBeTruthy();
  });
});
