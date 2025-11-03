import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import TransactionForm from "../TransactionForm";
import "@testing-library/jest-dom";


// 👇 mock axios so Jest never loads the real ESM axios package
jest.mock("axios", () => ({
  post: jest.fn(),
  get: jest.fn(),
  delete: jest.fn(),
}));


test("prevents form submission with empty fields", async () => {
  render(
    <Provider store={store}>
      <TransactionForm />
    </Provider>
  );

  const button = screen.getByRole("button", { name: /Add Transaction/i });
  fireEvent.click(button);

  // Instead of checking text, check that the button remains disabled or axios not called
  expect(button).toBeDisabled();
});
