import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "./App.jsx";

afterEach(cleanup);

describe("Little Lemon booking form", () => {
  it("renders the main booking fields", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /book a table/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  });

  it("shows helpful errors when required fields are missing", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /reserve a table/i }));
    expect(screen.getByText("Please choose a reservation time.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email address.")).toBeInTheDocument();
  });

  it("shows a confirmation after a valid booking", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: "18:00" } });
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "Alex Lemon" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "alex@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /reserve a table/i }));
    expect(screen.getByRole("status")).toHaveTextContent(/reservation request received/i);
    expect(screen.getByRole("status")).toHaveTextContent("Alex Lemon");
  });
});