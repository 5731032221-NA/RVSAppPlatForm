import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  ZoomableGroup,
  Graticule,
} from "react-simple-maps";
import mapData from "../../assets/map.csv";
import Container from "@material-ui/core/Container";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#D2DEED", "#34ACFF"]);

export default function WorldMap() {
  const [data, setData] = useState([]);
  useEffect(() => {
    csv(mapData).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <Container>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 240,
        }}
      >
        <ZoomableGroup zoom={1}>
          <Sphere stroke="#D2DEED" strokeWidth={0.5} />
          <Graticule stroke="#D2DEED" strokeWidth={0.5} />
          {data.length > 0 && (
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                    />
                  );
                })
              }
            </Geographies>
          )}
        </ZoomableGroup>
      </ComposableMap>
    </Container>
  );
}
