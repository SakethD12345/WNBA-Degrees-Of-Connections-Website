import React, { Dispatch, SetStateAction, useState } from "react";
import "./Input.css";
import { FeatureCollection } from "geojson";
import rl_data from "../geodata/fullDownload.json";

//defines prop for handling searching and broadband searching
interface InputProps {
  search: GeoJSON.FeatureCollection | undefined;
  setSearch: Dispatch<SetStateAction<GeoJSON.FeatureCollection | undefined>>;
}

//adds keyboard shortcuts
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey || event.metaKey) {
    //commands that we want to combine with control key
  } else {
    switch (event.key) {
      //enters command when enter pressed
      case "Enter":
        document.getElementById("submit-button")!.click();
        event.preventDefault();
        break;
    }
  }
});

/**
 * class handles inputting and submitting information, as well as displaying
 * some broadband information
 * @param props input props
 * @returns component as a whole
 */
export function Input(props: InputProps) {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);
  const [displayText, setDisplayText] = useState("Enter a command!");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setCount(count + 1);
    setInputValue("");
    let dividedInput = inputValue.split(" ");
    if (dividedInput[0] === "broadband") {
      if (dividedInput.length !== 3) {
        setDisplayText(
          "Invalid broadband! Ensure commands are entered as 'broadband [County Name]" +
            "[State name]' Be sure to exclude the suffix 'county' from from county names and " +
            "to use %20 in the place of spaces in states or counties."
        );
      } else {
        accessBroadband(dividedInput[1], dividedInput[2])
          .then((result) => {
            setDisplayText(result);
          })
          .catch((error) => {
            console.error("Error accessing broadband:", error);
          });
      }
    } else if (dividedInput[0] === "search") {
       if (dividedInput.length === 1) {
        setDisplayText(
          "Invalid search! Ensure search phrase is given."
        );
      } else {
      const result = accessSearch(dividedInput, props).then((result) => {
        setDisplayText("Searched: " + result);
      });
    }
    } else {
      setDisplayText(
        "Command not recognized! Try 'search [key term]' or 'broadband [county name] [state name]'"
      );
    }
  };

  return (
    <div className="Input" aria-label="input">
      <fieldset>
        <legend> Search a value:</legend>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search value"
          className="InputTextBox"
          aria-label="Command input"
        />
        <button
          aria-label="Button"
          id="submit-button"
          onClick={handleSubmit}
          tabIndex={3}
        >
          Submitted {count} times
        </button>
      </fieldset>

      <div className="ResponseText" aria-label="response text">
        {displayText}{" "}
      </div>
    </div>
  );
}

//accesses broadband information by contacting backend server
async function accessBroadband(county: string, state: string): Promise<string> {
  let result: string = "";
  let broadband: string = "";
  let error: string = "";
  await fetch(
    "http://localhost:4568/broadband?county=" + county + "&state=" + state
  )
    .then((response) => response.json())
    .then((json) => {
      result = json.result;
      broadband = json.broadband;
      error = json.error;
    });

  if (result === "success") {
    return "Broadband internet access: " + broadband + "%";
  } else {
    return error;
  }
}

//accesses search information by contacting back end
async function accessSearch(
  search: string[],
  props: InputProps
): Promise<string> {
  var area_descriptor = "";
  area_descriptor = search[1];
  var search_phrase = search[1];
  for (let i = 2; i < search.length; i++) {
    area_descriptor += "%20";
    area_descriptor += search[i];
    search_phrase += " ";
    search_phrase += search[i];
  }
  if (search[search.length - 1] === "mock") {
    props.setSearch(overlayData());
  }
  else {
  let result: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };
  result.type = "FeatureCollection";

  await fetch("http://localhost:4568/geo-json?search=" + area_descriptor)
    .then((response) => response.json())
    .then((json) => {
      {
        props.setSearch(json);
        result = json;
      }
    });
  }
  return search_phrase;
}

function isFeatureCollection(json: any): json is FeatureCollection {
  return json.type === "FeatureCollection";
}

export function overlayData(): GeoJSON.FeatureCollection | undefined {
  return isFeatureCollection(rl_data) ? rl_data : undefined;
}



