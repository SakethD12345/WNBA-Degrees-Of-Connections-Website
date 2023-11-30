import { useState, useEffect, useRef } from "react";

import Map, {
  Layer,
  MapLayerMouseEvent,
  Source,
  ViewStateChangeEvent,
  MapRef,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { highlightLayer, geoLayer, isFeatureCollection } from "./overlays";

import { myKey } from "./private/key";

interface MapBoxProps {
  updateDisplayText: (newText: string) => void;
  search: GeoJSON.FeatureCollection | undefined;
}

export default function MapBox(props: MapBoxProps) {
  const mapRef = useRef<MapRef>(null);

  const [viewState, setViewState] = useState({
    longitude: -85.591,
    latitude: 42.299,
    zoom: 12,
    pitch: 45,
  });
  const [overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>(
    undefined
  );
  const [highlight, setHighlight] = useState<
    GeoJSON.FeatureCollection | undefined
  >(undefined);

  useEffect(() => {
    fetch("http://localhost:5568/geo-json").then((r) =>
      r
        .json()
        .then((r) => (isFeatureCollection(r) ? r : undefined))
        .then((r) => setOverlay(r))
    );
  }, [])
  useEffect(() => {
    setHighlight(props.search);
  }, [props.search]);

  return (
    <Map
      mapboxAccessToken={myKey}
      longitude={viewState.longitude}
      latitude={viewState.latitude}
      zoom={viewState.zoom}
      onMove={(ev: ViewStateChangeEvent) => setViewState(ev.viewState)}
      style={{ width: "100%", height: "75vh" }}
      mapStyle={"mapbox://styles/mapbox/streets-v12"}
      onClick={onMapClick}
      ref={mapRef}
      aria-label="Map interface"
    >
      <Source id="geo_data" type="geojson" data={overlay}>
        <Layer id={geoLayer.id} type={geoLayer.type} paint={geoLayer.paint} />
      </Source>
      <Source id="area_search" type="geojson" data={highlight}>
        <Layer
          id={highlightLayer.id}
          type={highlightLayer.type}
          paint={highlightLayer.paint}
        />
      </Source>
    </Map>
  );

  function onMapClick(e: MapLayerMouseEvent) {
    console.log(e.lngLat.lat);
    console.log(e.lngLat.lng);
    if (mapRef.current) {
      const map = mapRef.current.getMap();

      const features = map.queryRenderedFeatures(e.point, {
        layers: [geoLayer.id],
      });

      if (features.length > 0) {
        // Access properties with null checks and provide default values if they are null
        const properties = features[0]?.properties || {};
        const town = properties.city || "Unknown city";
        const state = properties.state || "Unknown State";
        const name = properties.name || "Unkown Name";

        console.log("Town:", town);
        console.log("State:", state);
        console.log("Name:", name);
        props.updateDisplayText(
          "Town: " + town + " State: " + state + " Name: " + name
        );
      } else {
        props.updateDisplayText("No features found at the clicked point.");
      }
    }
  }
}
