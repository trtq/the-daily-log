import React from "react";
import { fireEvent, render } from "@/utils/test-utils";
import { ConfirmModal } from "./ConfirmModal";

const defaultProps = {
  visible: true,
  headline: "Discard changes?",
  message: "This entry hasn't been saved yet.",
  cancelLabel: "Keep Editing",
  confirmLabel: "Discard",
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
};

describe("ConfirmModal", () => {
  test("renders its copy when visible", () => {
    const { getByText } = render(<ConfirmModal {...defaultProps} />);
    expect(getByText("Discard changes?")).toBeTruthy();
    expect(getByText("This entry hasn't been saved yet.")).toBeTruthy();
    expect(getByText("Keep Editing")).toBeTruthy();
    expect(getByText("Discard")).toBeTruthy();
  });

  test("renders nothing when not visible", () => {
    const { queryByText } = render(
      <ConfirmModal {...defaultProps} visible={false} />,
    );
    expect(queryByText("Discard changes?")).toBeNull();
  });

  test("calls onCancel when the cancel button is pressed", () => {
    const onCancel = jest.fn();
    const { getByTestId } = render(
      <ConfirmModal {...defaultProps} onCancel={onCancel} />,
    );
    fireEvent.press(getByTestId("confirm-cancel"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test("calls onConfirm when the confirm button is pressed", () => {
    const onConfirm = jest.fn();
    const { getByTestId } = render(
      <ConfirmModal {...defaultProps} onConfirm={onConfirm} />,
    );
    fireEvent.press(getByTestId("confirm-accept"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  test("calls onCancel when the backdrop is pressed", () => {
    const onCancel = jest.fn();
    const { getByTestId } = render(
      <ConfirmModal {...defaultProps} onCancel={onCancel} />,
    );
    fireEvent.press(getByTestId("confirm-backdrop"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
