# PlacePicker

A React app for building a personal list of places you would like to visit, with available places sorted by distance from your current location.

Built as a practice project while learning React (`useEffect`, side effects and cleanup).

| Location prompt | Available places | Your list |
| --- | --- | --- |
| ![Geolocation request](screenshots/geolocation.png) | ![Available places](screenshots/availablePlaces.png) | ![To-go places](screenshots/toGoPlaces.png) |

## Features

- Uses the browser Geolocation API to sort 18 sample places by distance from you
- Click a place to add it to your "I'd like to visit" list
- Your list is saved to `localStorage` and restored on reload
- Removing a place opens a confirmation modal that auto-confirms after 3 seconds, with a progress bar showing the countdown

Available places only appear after you allow location access; until then the section shows "Sorting places by distance...".

## Tech stack

- React 18
- Vite 4
- Browser Geolocation API and `localStorage`

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
