import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './GoogleMap.css';

const GoogleMap = (props) => {
    const [location, setLocation] = useState({
        lat: null,
        lng: null,
    });
    const [zoomLevel, setZoomLevel] = useState(15);

    useEffect(() => {
        setLocation({lat: props.lat, lng: props.lng});
    },[props]);

    return(
        <div className="map_container drop_shadow">
            <GoogleMapReact
                bootstrapURLKeys= {{key: 'AIzaSyBi33ikA-UNokHaz0abercTBz2bOjjdh38'}}
                center={location}
                defaultZoom={zoomLevel}
            >
            </GoogleMapReact>
        </div>
    );
}
export default GoogleMap;