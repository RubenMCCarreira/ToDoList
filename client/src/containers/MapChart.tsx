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
import capitalsCSV from './capitals.json';
import withInjectReducer from 'tool/redux/withInjectReducer';
import reducer, {
  stateMapRouteKey,
  mapRouteMapDispatchToProps,
  mapRouteMapStateToProps
} from '../store/mapRoute';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

interface IMapValues {
  ISO3: string;
  Name: string;
}

interface ICountry {
  country: string;
  capital: string;
  coordinates: number[];
}

interface MapCharProps {
  getList: Function;
  list: any[];
}

const MapChart = ({ getList, list }: MapCharProps) => {
  const [data, setData] = useState<IMapValues[]>([]);
  const [capitals, setCapitals] = useState<ICountry[]>([]);
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
    setCapitals(capitalsCSV);
  }, []);
  console.log(list);

  useEffect(() => {
    if (!list) {
      getList();
    }
  }, [list]);

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
        {(list || []).map((it) => (
          <MapLineFromTo
            key={it.id}
            from={[it.from.coordinates[1], it.from.coordinates[0]]}
            to={[it.to.coordinates[1], it.to.coordinates[0]]}
          />
        ))}
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
        <MapAnnotation coordinates={[2.3522, 48.8566]} title="Paris" />
        {capitals.map(({ capital, coordinates }, index) => (
          <MapPointMarker
            key={index}
            coordinates={[coordinates[1], coordinates[0]]}
            title={capital}
          />
        ))}
      </>
    </Map>
  );
};

export default withInjectReducer(
  stateMapRouteKey,
  reducer,
  mapRouteMapStateToProps,
  mapRouteMapDispatchToProps,
  MapChart
);
