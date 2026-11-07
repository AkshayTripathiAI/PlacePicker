import { useRef, useState, useEffect, useCallback } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

const STORAGE_KEY = "selectedPlaces";

function readStoredIds() {
  try {
    const ids = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

function writeStoredIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // storage unavailable - the list just won't persist
  }
}

// Ignore ids that no longer exist in the data set instead of crashing.
const storedPlaces = readStoredIds()
  .map((id) => AVAILABLE_PLACES.find((place) => place.id === id))
  .filter(Boolean);

const LOCATION_MESSAGES = {
  pending: "Finding your location to sort places by distance...",
  sorted: "Sorted by distance from you.",
  denied: "Location access was denied, so places are shown in default order.",
  unavailable:
    "Your browser does not support geolocation, so places are shown in default order.",
};

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // Show every place straight away; re-order once we know the user's location.
  const [availablePlaces, setAvailablePlaces] = useState(AVAILABLE_PLACES);
  const [locationStatus, setLocationStatus] = useState("pending");
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationStatus("unavailable");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setAvailablePlaces(
          sortPlacesByDistance(
            AVAILABLE_PLACES,
            position.coords.latitude,
            position.coords.longitude,
          ),
        );
        setLocationStatus("sorted");
      },
      () => setLocationStatus("denied"),
      { timeout: 10000, maximumAge: 10 * 60 * 1000 },
    );
  }, []);

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIds = readStoredIds();
    if (!storedIds.includes(id)) {
      writeStoredIds([id, ...storedIds]);
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current),
    );
    setModalIsOpen(false);

    writeStoredIds(readStoredIds().filter((id) => id !== selectedPlace.current));
  }, []);

  const pickedIds = new Set(pickedPlaces.map((place) => place.id));

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title={`I'd like to visit ... (${pickedPlaces.length})`}
          fallbackText="Select the places you would like to visit below."
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
          actionLabel="Remove"
        />
        <Places
          title="Available Places"
          subtitle={LOCATION_MESSAGES[locationStatus]}
          places={availablePlaces}
          fallbackText="No places available."
          onSelectPlace={handleSelectPlace}
          pickedIds={pickedIds}
          actionLabel="Add"
        />
      </main>
      <footer id="footer">
        <a
          href="https://github.com/AkshayTripathiAI/PlacePicker"
          target="_blank"
          rel="noreferrer"
        >
          View source on GitHub
        </a>
      </footer>
    </>
  );
}

export default App;
