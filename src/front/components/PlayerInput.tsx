import "../styles/style.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface PlayerInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;

  output: string[];
  setOutput: Dispatch<SetStateAction<string[]>>;

  setPlayer1Logo: Dispatch<SetStateAction<string>>;
  setPlayer2Logo: Dispatch<SetStateAction<string>>;
}

export function PlayerInput(props: PlayerInputProps) {
  const [inputString1, setInputString1] = useState<string>("");
  const [inputString2, setInputString2] = useState<string>("");
  let isValidCall: boolean = false;
  let count: number = -1;
  return (
    <div id="player-input">
      <div id="first-player-input">
        <legend className="input-header">Enter first player:</legend>
        <ControlledInput
          value={inputString1}
          setValue={setInputString1}
          ariaLabel={"Player 1 input"}
        />
      </div>
      <div id="second-player-input">
        <legend className="input-header">Enter second player:</legend>
        <ControlledInput
          value={inputString2}
          setValue={setInputString2}
          ariaLabel={"Player 2 input"}
        />
      </div>
      <button
        id="submit-button"
        onClick={() => {
          makeConnection(inputString1, inputString2, isValidCall, count, props);
          setInputString1("");
          setInputString2("");
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
  count: number,
  props: PlayerInputProps
) {
  fetch(
    "http://localhost:5555/connections?player1=" +
      PlayerOne +
      "&player2=" +
      PlayerTwo
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.result === "error") {
        props.setHistory([json.error, ...props.history]);
      } else if (json.result === "failure") {
        props.setHistory([
          "No connection between " + PlayerOne + " and " + PlayerTwo,
          ...props.history,
        ]);
      } else if (json.result === "success") {
        props.setOutput([PlayerOne, PlayerTwo]);
        props.setHistory([
          "The number of connections between " +
            PlayerOne +
            " and " +
            PlayerTwo +
            " is " +
            json.count,
          ...props.history,
        ]);

        count = json.count;
      }
    });
}
