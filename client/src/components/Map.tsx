import { ReactElement, useState } from 'react';
import {
  ComposableMap,
  Sphere,
  Graticule,
  ZoomableGroup
} from 'react-simple-maps';
import Button from '../components/Button';
import Div from '../components/Div';

interface MapProps {
  children: ReactElement;
}

const Map = ({ children }: MapProps) => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 0.9 });

  const handleReset = () => {
    setPosition({ coordinates: [0, 0], zoom: 0.9 });
  };

  const handleZoomOut = () => {
    const zoom = position.zoom - 0.5;
    let coordinates = position.coordinates;
    if (zoom < 1) return;
    if (zoom == 1) {
      coordinates = [0, 0];
    }
    setPosition({ coordinates, zoom: zoom });
  };

  const handleZoomIn = () => {
    if (position.zoom > 8) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom + 0.5 }));
  };

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  return (
    <Div id="map">
      <ComposableMap
        width={500}
        height={300}
        projectionConfig={{
          rotate: [0, 0, 0],
          scale: 100
        }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          {children}
        </ZoomableGroup>
      </ComposableMap>
      <Div spaceBetween>
        <Button label="-" onClick={handleZoomOut} />
        <Button label="Reset View" onClick={handleReset} />
        <Button label="+" onClick={handleZoomIn} />
      </Div>
    </Div>
  );
};

export default Map;
