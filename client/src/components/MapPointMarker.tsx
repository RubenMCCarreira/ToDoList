import { Marker } from 'react-simple-maps';
import { ICoordinates } from '../interfaces';

interface MapPointMarkerProps {
  coordinates: ICoordinates;
  title: string;
  markerOffset?: number;
}

const MapPointMarker = ({
  coordinates,
  title,
  markerOffset
}: MapPointMarkerProps) => {
  return (
    <Marker coordinates={coordinates}>
      <g
        fill="none"
        stroke="#F53"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(-2.5, -4.5)"
      >
        <circle cx="12" cy="5" r="0.2" transform="translate(-9, -2.5)" />
        <path
          d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"
          transform="scale(0.25, 0.25)"
        />
      </g>
      <text
        textAnchor="middle"
        y={markerOffset}
        style={{ fill: '#F53', fontSize: '3px' }}
      >
        {title}
      </text>
    </Marker>
  );
};

export default MapPointMarker;
