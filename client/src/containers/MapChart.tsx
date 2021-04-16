import { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup,
  Marker,
  Line,
  Annotation
} from 'react-simple-maps';
import Button from '../components/Button';
import Div from '../components/Div';

import dataCSV from './csvjson.json';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

interface IMapValues {
  ISO3: string;
  Name: string;
}

const colorScale = (scale) => {
  // rgb(65, 90, 60)
  // rgb(195, 245, 180)
  const r = Math.floor((65 + 195) * scale);
  const g = Math.floor((90 + 245) * scale);
  const b = Math.floor((60 + 180) * scale);
  return { r, g, b };
};

const MapChart = () => {
  const [data, setData] = useState<IMapValues[]>([]);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  useEffect(() => {
    setData(dataCSV);
  }, []);

  const handleReset = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
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
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);

                let r = 200,
                  g = 200,
                  b = 200;
                if (d) {
                  const result = colorScale(d['2017']);
                  r = result.r;
                  g = result.g;
                  b = result.b;
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={`rgb(${r},${g},${b})`}
                  />
                );
              })
            }
          </Geographies>
          <Marker coordinates={[-74.006, 40.7128]}>
            <circle r={1} fill="#F53" />
          </Marker>
          <Marker coordinates={[-101, 53]} fill="#777">
            <text textAnchor="middle" fill="#F53">
              Canada
            </text>
          </Marker>
          <Line
            from={[2.3522, 48.8566]}
            to={[-94.006, 30.7128]}
            stroke="#FF5533"
            strokeWidth={1}
            strokeLinecap="round"
          />
          <Line
            coordinates={[
              [-180, 0],
              [-90, 0],
              [0, 0],
              [90, 0],
              [180, 0]
            ]}
            stroke="#F53"
            strokeWidth={1}
          />
          <Annotation
            subject={[2.3522, 48.8566]}
            dx={-30}
            dy={-10}
            connectorProps={{
              stroke: '#FF5533',
              strokeWidth: 1,
              strokeLinecap: 'round'
            }}
          >
            <text
              x="-4"
              textAnchor="end"
              alignmentBaseline="middle"
              fill="#F53"
            >
              Paris
            </text>
          </Annotation>
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

export default MapChart;
