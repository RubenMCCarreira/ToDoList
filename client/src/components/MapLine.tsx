import { Line } from 'react-simple-maps';
import { ICoordinates } from '../interfaces';

interface MapLineProps {
  coordinates: ICoordinates[];
}

const MapLine = ({ coordinates }: MapLineProps) => {
  return <Line coordinates={coordinates} stroke="#F53" strokeWidth={1} />;
};

export default MapLine;
