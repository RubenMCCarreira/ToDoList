import { Marker } from 'react-simple-maps';
import { useThemeContext } from '../contexts/Theme';
import { ICoordinates } from '../interfaces';

interface MapPointMarkerProps {
  coordinates: ICoordinates;
  title: string;
  markerOffset?: number;
}

const MapPointMarker = ({
  coordinates,
  title,
  markerOffset = 1.5
}: MapPointMarkerProps) => {
  const { theme, themes } = useThemeContext();

  return (
    <Marker coordinates={coordinates}>
      <g
        fill="none"
        stroke={theme == themes[0] ? '#6ad8fd' : 'black'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(-1.2, -1.8)"
      >
        <path
          d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"
          transform="scale(0.1, 0.1)"
        />
      </g>
      <text
        textAnchor="middle"
        y={markerOffset}
        style={{
          fill: theme == themes[0] ? '#6ad8fd' : 'black',
          fontSize: '1px'
        }}
      >
        {title}
      </text>
    </Marker>
  );
};

export default MapPointMarker;
