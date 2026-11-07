# PlacePicker

**Live demo:** https://akshaytripathiai.github.io/PlacePicker/

A React app for building a personal list of places you would like to visit, with available places sorted by distance from your current location.

Built as a practice project while learning React (`useEffect`, side effects and cleanup).

| Location prompt | Available places | Your list |
| --- | --- | --- |
| ![Geolocation request](screenshots/geolocation.png) | ![Available places](screenshots/availablePlaces.png) | ![To-go places](screenshots/toGoPlaces.png) |

## Features

- Uses the browser Geolocation API to sort 18 sample places by distance from you, with the distance in km shown on each card
- Places are shown immediately; if location access is denied or unavailable they stay in the default order with a short notice instead of an endless "Sorting..." message
- Click a place to add it to your "I'd like to visit" list (places already on your list are marked and disabled); the list header shows a count
- Your list is saved to `localStorage` and restored on reload (corrupted or outdated saved data is ignored safely)
- Removing a place opens a confirmation modal that auto-confirms after 3 seconds, with a progress bar showing the countdown; Escape or "No" cancels
- Keyboard focus styles, accessible button labels and a single-column layout on phones

## Tech stack

- React 18
- Vite 4
- Browser Geolocation API and `localStorage`
- Deployed to GitHub Pages from the `gh-pages` branch (`base: '/PlacePicker/'` in `vite.config.js`)

Note: browsers only offer geolocation on secure origins (HTTPS or localhost), which GitHub Pages provides.

## Getting started

Prerequisites: Node.js 18+ and npm.

```bash
git clone https://github.com/AkshayTripathiAI/PlacePicker.git
cd PlacePicker
npm install
npm run dev
```

Then open the URL Vite prints (by default http://localhost:5173).

Other scripts: `npm run build`, `npm run preview`.

## Project structure

```
src/
  App.jsx                   # state, geolocation sorting, localStorage sync
  data.js                   # sample places with coordinates
  loc.js                    # haversine distance + sort helper
  components/
    Places.jsx              # renders a list of places
    Modal.jsx               # <dialog> via createPortal
    DeleteConfirmation.jsx  # auto-confirm timer with cleanup
    ProgressBar.jsx
```
