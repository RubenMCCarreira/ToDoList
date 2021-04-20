import { Line } from 'react-simple-maps';
import { ICoordinates } from '../interfaces';

interface MapLineFromToProps {
  from: ICoordinates;
  to: ICoordinates;
  round?: boolean;
}

const MapLineFromTo = ({ from, to, round }: MapLineFromToProps) => {
  return (
    <Line
      stroke="#F53"
      strokeWidth={1}
      from={from}
      to={to}
      strokeLinecap={round ? 'round' : null}
    />
  );
};

export default MapLineFromTo;
