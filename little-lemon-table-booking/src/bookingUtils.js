// Keep validation separate so it is easy to test and maintain.
export function getTodayLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function validateBooking(values) {
  const errors = {};

  if (!values.date) {
    errors.date = "Please choose a booking date.";
  } else if (values.date < getTodayLocalDate()) {
    errors.date = "Please choose today or a future date.";
  }

  if (!values.time) {
    errors.time = "Please choose a reservation time.";
  }

  const guests = Number(values.guests);
  if (!values.guests) {
    errors.guests = "Please select the number of guests.";
  } else if (!Number.isInteger(guests) || guests < 1 || guests > 10) {
    errors.guests = "Choose between 1 and 10 guests.";
  }

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address, such as name@example.com.";
  }

  return errors;
}