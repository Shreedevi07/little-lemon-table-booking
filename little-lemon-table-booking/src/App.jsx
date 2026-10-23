import React, { useMemo, useState } from "react";
import { getTodayLocalDate, validateBooking } from "./bookingUtils.js";

const TIMES = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
const timeLabel = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
};

export default function App() {
  const today = useMemo(() => getTodayLocalDate(), []);
  const [values, setValues] = useState({
    date: today,
    time: "",
    guests: "2",
    occasion: "None",
    name: "",
    email: "",
    requests: ""
  });
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setConfirmation(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateBooking(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setConfirmation(null);
      const firstError = document.getElementById(Object.keys(nextErrors)[0]);
      firstError?.focus();
      return;
    }

    setConfirmation({
      ...values,
      timeLabel: timeLabel(values.time),
      bookingId: `LL-${Date.now().toString().slice(-6)}`
    });
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Little Lemon home">
          <span className="brand-mark" aria-hidden="true">🍋</span>
          <span><strong>Little Lemon</strong><small>MEDITERRANEAN KITCHEN</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#booking" aria-current="page">Reservations</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">FRESH • SEASONAL • MEDITERRANEAN</p>
            <h1>Make a reservation</h1>
            <p>Join us for fresh Mediterranean flavours, warm hospitality, and a lovely meal shared together.</p>
            <a className="primary-link" href="#booking">Book your table</a>
          </div>
          <div className="hero-art" role="img" aria-label="Illustration of a lemon and fresh leaves">
            <span className="lemon">🍋</span>
            <span className="leaf leaf-one" aria-hidden="true"></span>
            <span className="leaf leaf-two" aria-hidden="true"></span>
          </div>
        </section>

        <section className="booking-section" id="booking" aria-labelledby="booking-title">
          <div className="section-intro">
            <p className="eyebrow">YOUR TABLE IS WAITING</p>
            <h2 id="booking-title">Book a table</h2>
            <p>Choose your date and time. We look forward to welcoming you.</p>
          </div>

          {confirmation ? (
            <div className="confirmation" role="status" aria-live="polite">
              <div className="success-icon" aria-hidden="true">✓</div>
              <h3>Reservation request received!</h3>
              <p>Thank you, {confirmation.name}. Your booking details are below.</p>
              <dl className="booking-summary">
                <div><dt>Reference</dt><dd>{confirmation.bookingId}</dd></div>
                <div><dt>Date</dt><dd>{confirmation.date}</dd></div>
                <div><dt>Time</dt><dd>{confirmation.timeLabel}</dd></div>
                <div><dt>Guests</dt><dd>{confirmation.guests}</dd></div>
                <div><dt>Email</dt><dd>{confirmation.email}</dd></div>
              </dl>
              <p className="notice">This demo shows a local confirmation only; it does not send an email or save the booking to a server.</p>
              <button className="secondary-button" type="button" onClick={() => {
                setConfirmation(null);
                setValues({ date: today, time: "", guests: "2", occasion: "None", name: "", email: "", requests: "" });
                setErrors({});
              }}>Make another reservation</button>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="date">Choose date <span aria-hidden="true">*</span></label>
                  <input id="date" name="date" type="date" min={today} value={values.date} onChange={updateField}
                    aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "date-error" : "date-help"} required />
                  <small id="date-help" className="field-help">Bookings are available from today onwards.</small>
                  {errors.date && <p className="error" id="date-error">{errors.date}</p>}
                </div>

                <div className="field">
                  <label htmlFor="time">Choose time <span aria-hidden="true">*</span></label>
                  <select id="time" name="time" value={values.time} onChange={updateField}
                    aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? "time-error" : undefined} required>
                    <option value="">Select a time</option>
                    {TIMES.map((time) => <option key={time} value={time}>{timeLabel(time)}</option>)}
                  </select>
                  {errors.time && <p className="error" id="time-error">{errors.time}</p>}
                </div>

                <div className="field">
                  <label htmlFor="guests">Number of guests <span aria-hidden="true">*</span></label>
                  <select id="guests" name="guests" value={values.guests} onChange={updateField}
                    aria-invalid={Boolean(errors.guests)} aria-describedby={errors.guests ? "guests-error" : "guests-help"} required>
                    {Array.from({ length: 10 }, (_, index) => index + 1).map((count) =>
                      <option key={count} value={String(count)}>{count} {count === 1 ? "guest" : "guests"}</option>
                    )}
                  </select>
                  <small id="guests-help" className="field-help">For parties larger than 10, please contact us.</small>
                  {errors.guests && <p className="error" id="guests-error">{errors.guests}</p>}
                </div>

                <div className="field">
                  <label htmlFor="occasion">Occasion</label>
                  <select id="occasion" name="occasion" value={values.occasion} onChange={updateField}>
                    <option>None</option><option>Birthday</option><option>Anniversary</option><option>Business meal</option><option>Other</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="name">Your name <span aria-hidden="true">*</span></label>
                  <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={updateField}
                    placeholder="Enter your name" aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined} required />
                  {errors.name && <p className="error" id="name-error">{errors.name}</p>}
                </div>

                <div className="field">
                  <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
                  <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={updateField}
                    placeholder="you@example.com" aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined} required />
                  {errors.email && <p className="error" id="email-error">{errors.email}</p>}
                </div>

                <div className="field full-width">
                  <label htmlFor="requests">Special requests <span className="optional">(optional)</span></label>
                  <textarea id="requests" name="requests" rows="3" maxLength="300" value={values.requests}
                    onChange={updateField} placeholder="Allergies, accessibility needs, or anything we should know." />
                  <small className="field-help">{values.requests.length}/300 characters</small>
                </div>
              </div>

              <p className="required-note"><span aria-hidden="true">*</span> Required fields</p>
              <button className="submit-button" type="submit">Reserve a table</button>
              <p className="privacy-note">Your details are used only to demonstrate the booking flow in this coursework project.</p>
            </form>
          )}
        </section>

        <section className="info-strip" id="menu">
          <div><span aria-hidden="true">🥗</span><h3>Seasonal ingredients</h3><p>Fresh, colourful dishes inspired by the Mediterranean.</p></div>
          <div><span aria-hidden="true">🕯️</span><h3>A welcoming space</h3><p>Casual dining for celebrations and everyday moments.</p></div>
          <div><span aria-hidden="true">🍽️</span><h3>Made with care</h3><p>We want every visit to feel special.</p></div>
        </section>
      </main>

      <footer id="contact">
        <a className="footer-brand" href="#home">🍋 Little Lemon</a>
        <p>Fresh Mediterranean food, made with care.</p>
        <p>© {new Date().getFullYear()} Little Lemon · Coursework demo</p>
      </footer>
    </div>
  );
}