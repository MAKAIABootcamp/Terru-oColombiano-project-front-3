import React, { useState } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';

const PlaceSearch = (props) => {
  const [places, setPlaces] = useState([]);

  const handlePlaceChanged = (place) => {
    setPlaces([place]);
    props.onPlaceChanged(place);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a place"
        style={{ width: '100%', padding: '10px' }}
        onChange={(event) => {
          const input = event.target.value;
          const request = {
            query: input,
            fields: ['name', 'formatted_address', 'geometry'],
          };
          const service = new window.google.maps.places.PlacesService(
            document.createElement('div')
          );
          service.textSearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setPlaces(results);
            }
          });
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            event.preventDefault();
          }
        }}
      />
      {places.length > 0 && (
        <select
          style={{ width: '100%', padding: '10px' }}
          onChange={(event) => {
            const placeId = event.target.value;
            const selectedPlace = places.find((place) => place.place_id.toLoweCase().includes(placeId.toLowerCase()));
            handlePlaceChanged(selectedPlace);
          }}
        >
          <option value="">Select a place</option>
          {places.map((place) => (
            <option key={place.place_id} value={place.place_id}>
              {place.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD77vfAu1kBoFFgavfDxBjkkj9xEx24E10'
})(PlaceSearch);
