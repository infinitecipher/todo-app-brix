import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import TodoApp from "./TodoApp";

test("render todo app, add, edit, delete, toggle", async () => {
  render(<TodoApp />);

  // render header
  const header = screen.getByTestId("todo-header");
  expect(header).toBeInTheDocument();

  // Add
  const input = screen.getByTestId("todo-input");
  const addButton = screen.getByTestId("todo-add-button");

  // simulate type and click add

  const textInput = "First test";
  await act(async () => {
    await userEvent.type(input, textInput);
    await userEvent.click(addButton);
  });

  // expect atleast 1 item on list

  const itemInput = screen.getByTestId("item-input-0");

  expect(itemInput).toBeInTheDocument();

  //update
});
