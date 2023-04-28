import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { getPlaceDetails } from '../../redux/actions/placesActions';

const mapStyles = {
    width: '400px',
    height: '400px',
    margin: 0,
    padding: 0,
    borderRadius: '12px',
};

const MapContainer = (props) => {
    const [location, setLocation] = useState({ lat: 4.570868, lng: -74.297333 });
    const [showMap, setShowMap] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const handleMapClick = async (mapProps, map, clickEvent) => {
        const lat = clickEvent.latLng.lat();
        const lng = clickEvent.latLng.lng();
        const location = { lat, lng };
        const place = await getPlaceDetails(lat, lng, props.apiKey);
        setLocation({ ...location, place });
        console.log(place);
        props.onLocationSelected({ ...location, place });
        setShowMap(false);
    };

    const handleSelectLocation = () => {
        setShowMap(true);
    };
    console.log(location);

    return (
        <div>
            {showButton && (
                <small onClick={handleSelectLocation}>Seleccionar ubicación</small>
            )}
            {showMap && (
                <div>
                    <Map
                        google={props.google}
                        zoom={8}
                        style={mapStyles}
                        initialCenter={{ lat: 4.570868, lng: -74.297333 }}
                        onClick={handleMapClick}
                    >
                        <Marker position={location} />
                    </Map>

                </div>
            )}
            {location.place ? location.place.formatted_address : ''}


        </div>
    );
};
export default GoogleApiWrapper({
    apiKey: 'AIzaSyD77vfAu1kBoFFgavfDxBjkkj9xEx24E10'
})(MapContainer);