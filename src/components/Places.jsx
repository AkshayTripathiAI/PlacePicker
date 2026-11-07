const distanceFormat = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 0,
});

export default function Places({
  title,
  subtitle,
  places,
  fallbackText,
  onSelectPlace,
  pickedIds,
  actionLabel,
}) {
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {subtitle && <p className="places-subtitle">{subtitle}</p>}
      {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {places.length > 0 && (
        <ul className="places">
          {places.map((place) => {
            const isPicked = pickedIds?.has(place.id);
            return (
              <li key={place.id} className="place-item">
                <button
                  onClick={() => onSelectPlace(place.id)}
                  aria-label={`${actionLabel} ${place.title}`}
                  disabled={isPicked}
                >
                  <img src={place.image.src} alt={place.image.alt} />
                  <h3>{place.title}</h3>
                  {place.distance != null && (
                    <span className="place-distance">
                      {distanceFormat.format(place.distance)} km away
                    </span>
                  )}
                  {isPicked && (
                    <span className="place-picked">On your list</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
