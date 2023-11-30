import { FeatureCollection } from "geojson";
import { useState } from "react";
import { FillLayer } from "react-map-gl";


export function isFeatureCollection(json: any): json is FeatureCollection {
  return json.type === "FeatureCollection";
}


const propertyName = "holc_grade";

export const highlightLayer: FillLayer = {
  id: "area_search",
  type: "fill",
  paint: {
    "fill-color": "#00008b",
    "fill-opacity": 0.5,
  },
};

export const geoLayer: FillLayer = {
  id: "geo_data",
  type: "fill",
  paint: {
    "fill-color": [
      "match",
      ["get", propertyName],
      "A",
      "#5bcc04",
      "B",
      "#04b8cc",
      "C",
      "#e9ed0e",
      "D",
      "#d11d1d",
      "#ccc",
    ],
    "fill-opacity": 0.2,
  },
};
