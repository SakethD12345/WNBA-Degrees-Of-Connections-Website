import "../styles/style.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface PlayerInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;

  output: string[];
  setOutput: Dispatch<SetStateAction<string[]>>;
}

export function PlayerInput(props: PlayerInputProps) {
  const [inputString1, setInputString1] = useState<string>("");
  const [inputString2, setInputString2] = useState<string>("");
  let isValidCall: boolean = false;
  let count: number = -1;
  return (
    <div id="player-input">
      <div id="first-player-input">
        <legend>Enter first player:</legend>
        <ControlledInput
          value={inputString1}
          setValue={setInputString1}
          ariaLabel={"Player 1 input"}
        />
      </div>
      <div id="second-player-input">
        <legend>Enter second player:</legend>
        <ControlledInput
          value={inputString2}
          setValue={setInputString2}
          ariaLabel={"Player 2 input"}
        />
      </div>
      <button
        id="submit-button"
        onClick={() => {
          props.setHistory([
            inputString1 + " " + inputString2,
            ...props.history,
          ]);
          makeConnection(inputString1, inputString2, isValidCall, count);
        }}
      >
        Submit
      </button>
    </div>
  );
}

async function makeConnection(
  PlayerOne: string,
  PlayerTwo: string,
  isValidCall: boolean,
  count: number
) {
  let message = "";
  fetch(
    "http://localhost:3232/connection?player1=" +
      PlayerOne +
      "&player2=" +
      PlayerTwo
  )
    .then((response) => response.json())
    .then((json) => {
      json.message === "success" ? (isValidCall = true) : (isValidCall = false);
      isValidCall ? (count = json.count) : (count = -1);
    });
}
