import { useCallback, useEffect, useState } from 'react';
import { Geographies, Geography } from 'react-simple-maps';
import Map from '../components/Map';
import MapAnnotation from '../components/MapAnnotation';
import MapDotMarker from '../components/MapDotMarker';
import MapLine from '../components/MapLine';
import MapLineFromTo from '../components/MapLineFromTo';
import MapPointMarker from '../components/MapPointMarker';
import MapTextMarker from '../components/MapTextMarker';
import { useThemeContext } from '../contexts/Theme';
import dataCSV from './csvjson.json';

const markers = [
  { markerOffset: -5, name: 'Buenos Aires', coordinates: [-58.3816, -34.6037] },
  { markerOffset: 5, name: 'La Paz', coordinates: [-68.1193, -16.4897] },
  { markerOffset: 5, name: 'Brasilia', coordinates: [-47.8825, -15.7942] },
  { markerOffset: 5, name: 'Santiago', coordinates: [-70.6693, -33.4489] },
  { markerOffset: 5, name: 'Bogota', coordinates: [-74.0721, 4.711] },
  { markerOffset: 5, name: 'Quito', coordinates: [-78.4678, -0.1807] },
  { markerOffset: -5, name: 'Georgetown', coordinates: [-58.1551, 6.8013] },
  { markerOffset: -5, name: 'Asuncion', coordinates: [-57.5759, -25.2637] },
  { markerOffset: 5, name: 'Paramaribo', coordinates: [-55.2038, 5.852] },
  { markerOffset: 5, name: 'Montevideo', coordinates: [-56.1645, -34.9011] },
  { markerOffset: 5, name: 'Caracas', coordinates: [-66.9036, 10.4806] },
  { markerOffset: 5, name: 'Lima', coordinates: [-77.0428, -12.0464] }
];

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

interface IMapValues {
  ISO3: string;
  Name: string;
}

const MapChart = () => {
  const [data, setData] = useState<IMapValues[]>([]);
  const { theme, themes } = useThemeContext();

  const colorScale = useCallback(
    (scale) => {
      let r, g, b;

      if (theme === themes[0]) {
        // rgb(175, 170, 170)
        // rgb(55, 50, 50)
        r = Math.floor((175 + 55) * scale);
        g = Math.floor((170 + 50) * scale);
        b = Math.floor((170 + 50) * scale);
      } else if (theme === themes[1]) {
        // rgb(195, 245, 180)
        // rgb(65, 90, 60)
        r = Math.floor((195 + 65) * scale);
        g = Math.floor((245 + 90) * scale);
        b = Math.floor((180 + 60) * scale);
      } else if (theme === themes[2]) {
        // rgb(250, 180, 180)
        // rgb(135, 15, 15)
        r = Math.floor((250 + 135) * scale);
        g = Math.floor((180 + 15) * scale);
        b = Math.floor((180 + 15) * scale);
      }

      return { r, g, b };
    },
    [theme, themes]
  );

  useEffect(() => {
    setData(dataCSV);
  }, []);

  return (
    <Map>
      <>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);

              let r = 255,
                g = 255,
                b = 255;
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
        <MapLineFromTo from={[2.3522, 48.8566]} to={[-94.006, 30.7128]} />
        <MapLine
          coordinates={[
            [-180, 0],
            [-90, 0],
            [0, 0],
            [90, 0],
            [180, 0]
          ]}
        />
        <MapDotMarker coordinates={[-74.006, 40.7128]} />
        <MapTextMarker coordinates={[-101, 53]} title="Canada" />
        {markers.map(({ name, coordinates, markerOffset }) => (
          <MapPointMarker
            key={name}
            coordinates={[coordinates[0], coordinates[1]]}
            title={name}
            markerOffset={markerOffset}
          />
        ))}
        <MapAnnotation coordinates={[2.3522, 48.8566]} title="Paris" />
      </>
    </Map>
  );
};

export default MapChart;
