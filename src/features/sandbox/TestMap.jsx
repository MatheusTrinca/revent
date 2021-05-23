import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap({ location }) {
  const { center, zoom } = location;

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC5el5Xj7sA-JGrMW0oJ0gBPyMqwbGpUY4' }}
        center={center}
        zoom={zoom}
      >
        <AnyReactComponent lat={center.lat} lng={center.lng} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
