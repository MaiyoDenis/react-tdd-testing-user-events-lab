import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

import App from "../App";

describe("Newsletter Signup Form", () => {
  test("the form includes text inputs for name and email address", () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test("the form includes three checkboxes to select areas of interest", () => {
    render(<App />);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);
  });

  test("the checkboxes are initially unchecked", () => {
    render(<App />);
    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  test("the page shows information the user types into the name and email address form fields", async () => {
    render(<App />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
  });

  test("checked status of checkboxes changes when user clicks them", async () => {
    render(<App />);

    const checkboxes = screen.getAllByRole("checkbox");

    await userEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();

    await userEvent.click(checkboxes[0]);
    expect(checkboxes[0]).not.toBeChecked();
  });

  test("a message is displayed when the user clicks the Submit button", async () => {
    render(<App />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const checkboxes = screen.getAllByRole("checkbox");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.click(checkboxes[0]);
    await userEvent.click(submitButton);

    const message = screen.getByText(/thank you, john doe/i);
    expect(message).toBeInTheDocument();
  });
});
