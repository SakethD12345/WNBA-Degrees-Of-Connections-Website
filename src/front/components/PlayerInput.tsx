import "../styles/style.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface PlayerInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
}

export function PlayerInput(props: PlayerInputProps) {
  const [inputString, setInputString] = useState<string>("");
  return (
    <div id="player-input">
      <div id="first-player-input">
        <legend>Enter first player:</legend>
        <ControlledInput
          value={inputString}
          setValue={setInputString}
          ariaLabel={"Player 1 input"}
        />
      </div>
      <div id="second-player-input">
        <legend>Enter second player:</legend>
        <ControlledInput
          value={inputString}
          setValue={setInputString}
          ariaLabel={"Player 2 input"}
        />
      </div>
      <button id="submit-button">Submit</button>
    </div>
  );
}
