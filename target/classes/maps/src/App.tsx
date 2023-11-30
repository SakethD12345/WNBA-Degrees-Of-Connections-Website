import React, { useEffect, useState } from "react";
import "./App.css";
import MapBox from "./MapBox";
import { Input } from "./Input";

//top level app class. Creates the header with the input (input contains searhc box,
// button, text output), mapbox, and other text output.
function App() {
  //define set state, pass as prop
  let result: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };

  result.type = "FeatureCollection";

  const [search, setSearch] = useState<GeoJSON.FeatureCollection | undefined>(
    result
  );
  
  const [displayText, setDisplayText] = useState("");
  return (
    <div className="App">
      <div className="App-header">
        <Input search={search} setSearch={setSearch} />
      </div>
      <MapBox updateDisplayText={setDisplayText} search={search} />
      <div className="ResponseText">{displayText}</div>
    </div>
  );
}

export default App;
