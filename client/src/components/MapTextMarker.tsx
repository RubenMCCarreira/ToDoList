import { Marker } from 'react-simple-maps';
import { ICoordinates } from '../interfaces';

interface MapTextMarkerProps {
  coordinates: ICoordinates;
  title: string;
}

const MapTextMarker = ({ coordinates, title }: MapTextMarkerProps) => {
  return (
    <Marker coordinates={coordinates}>
      <text textAnchor="middle" fill="#F53" fontSize="7px">
        {title}
      </text>
    </Marker>
  );
};

export default MapTextMarker;
