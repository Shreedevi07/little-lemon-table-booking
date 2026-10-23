# Little Lemon Table Booking

A responsive React coursework project for a Little Lemon restaurant table-reservation flow. It includes accessible form controls, client-side validation, a confirmation state, and unit tests.

## Features

- Responsive layout for mobile and desktop screens.
- Semantic HTML and labels connected to form controls.
- Date validation (today or a future date), required time, party size from 1–10, name, and email validation.
- Clear inline error messages and focus moved to the first invalid field.
- Confirmation summary after a valid form submission.
- Unit tests for validation and the main form interactions.
- Reduced-motion support and visible keyboard focus styles.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

1. Extract the project ZIP.
2. Open a terminal in the `little-lemon-table-booking` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal (Vite usually uses `http://localhost:5173`).

## Run tests

Run tests in watch mode:

```bash
npm test
```

Run tests once:

```bash
npm run test:run
```

Create a production build:

```bash
npm run build
```

## Git repository setup

Run these commands in the project folder after installing Git:

```bash
git init
git add .
git commit -m "Build Little Lemon table booking app"
```

To publish it to GitHub, create an empty repository on GitHub, then use the repository URL GitHub provides:

```bash
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your own repository URL. Do not share passwords or access tokens.

## Booking flow and limitations

This is a front-end demonstration. A successful form submission displays a confirmation on screen, but the project does not connect to a restaurant booking API, persist reservations, check live table availability, or send email. Those features require a backend or reservation service.

The available times are sample options for the coursework and are not live availability.

## Project structure

```text
little-lemon-table-booking/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── App.test.jsx
    ├── bookingUtils.js
    ├── bookingUtils.test.js
    ├── main.jsx
    └── styles.css
```

## Accessibility notes

- Each input has an associated visible label.
- Required fields are marked visually and with native `required` attributes.
- Validation errors are associated with fields using `aria-describedby` and `aria-invalid`.
- The confirmation uses a live status region.
- Keyboard focus is visible, and reduced-motion preferences are respected.

## Before submitting

1. Run `npm install`.
2. Run `npm run test:run` and confirm all tests pass.
3. Run `npm run build`.
4. Start the app and test it at desktop and mobile widths.
5. Commit the project to Git and add your repository URL to your submission if requested.
