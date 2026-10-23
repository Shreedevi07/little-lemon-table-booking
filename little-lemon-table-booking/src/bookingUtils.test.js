import { describe, expect, it } from "vitest";
import { getTodayLocalDate, validateBooking } from "./bookingUtils.js";

const validBooking = () => ({
  date: getTodayLocalDate(),
  time: "18:00",
  guests: "2",
  occasion: "None",
  name: "Alex Lemon",
  email: "alex@example.com",
  requests: ""
});

describe("validateBooking", () => {
  it("accepts a valid booking", () => {
    expect(validateBooking(validBooking())).toEqual({});
  });

  it("requires a date and time", () => {
    const values = { ...validBooking(), date: "", time: "" };
    const errors = validateBooking(values);
    expect(errors.date).toBe("Please choose a booking date.");
    expect(errors.time).toBe("Please choose a reservation time.");
  });

  it("rejects a date in the past", () => {
    const values = { ...validBooking(), date: "2000-01-01" };
    expect(validateBooking(values).date).toBe("Please choose today or a future date.");
  });

  it("limits the party size to 1 through 10", () => {
    expect(validateBooking({ ...validBooking(), guests: "0" }).guests).toBe("Choose between 1 and 10 guests.");
    expect(validateBooking({ ...validBooking(), guests: "11" }).guests).toBe("Choose between 1 and 10 guests.");
  });

  it("requires a name", () => {
    expect(validateBooking({ ...validBooking(), name: "   " }).name).toBe("Please enter your name.");
  });

  it("rejects an invalid email address", () => {
    expect(validateBooking({ ...validBooking(), email: "not-an-email" }).email)
      .toBe("Enter a valid email address, such as name@example.com.");
  });

  it("requires an email address", () => {
    expect(validateBooking({ ...validBooking(), email: "" }).email).toBe("Please enter your email address.");
  });
});