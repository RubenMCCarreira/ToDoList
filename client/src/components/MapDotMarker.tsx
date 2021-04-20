import { Marker } from 'react-simple-maps';
import { ICoordinates } from '../interfaces';

interface MapDotMarkerProps {
  coordinates: ICoordinates;
}

const MapDotMarker = ({ coordinates }: MapDotMarkerProps) => {
  return (
    <Marker coordinates={coordinates}>
      <circle r={1} fill="#F53" />
    </Marker>
  );
};

export default MapDotMarker;
