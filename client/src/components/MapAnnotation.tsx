import { Annotation } from 'react-simple-maps';
import { ICoordinates } from '../interfaces';

interface MapAnnotationProps {
  coordinates: ICoordinates;
  title: string;
}

const MapAnnotation = ({ coordinates, title }: MapAnnotationProps) => {
  return (
    <Annotation
      subject={coordinates}
      dx={-7}
      dy={-7}
      connectorProps={{
        stroke: '#F53',
        strokeWidth: 1,
        strokeLinecap: 'round'
      }}
    >
      <text
        x="-5"
        textAnchor="end"
        alignmentBaseline="middle"
        fill="#F53"
        fontSize="7px"
      >
        {title}
      </text>
    </Annotation>
  );
};

export default MapAnnotation;
