import "../styles/style.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { makeConnection } from "./ServerAccess";

interface PlayerInputProps {
  inputString1: string;
  setInputString1: Dispatch<SetStateAction<string>>;

  inputString2: string;
  setInputString2: Dispatch<SetStateAction<string>>;

  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;

  inputtedPlayers: string[];
  setInputtedPlayers: Dispatch<SetStateAction<string[]>>;

  connectingPlayers: string[][];
  setConnectingPlayers: Dispatch<SetStateAction<string[][]>>;

  setCurrentTeam1: Dispatch<SetStateAction<string>>;
  setCurrentTeam2: Dispatch<SetStateAction<string>>;
}

export function PlayerInput(props: PlayerInputProps) {
  let count: number = -1;

  function handleSubmit() {
    makeConnection(props.inputString1, props.inputString2, count, props);
  }

  return (
    <div id="player-input">
      <div id="first-player-input">
        <legend className="input-header">Enter first player:</legend>
        <ControlledInput
          value={props.inputString1}
          setValue={props.setInputString1}
          ariaLabel={"Player 1 input"}
        />
      </div>
      <div id="second-player-input">
        <legend className="input-header">Enter second player:</legend>
        <ControlledInput
          value={props.inputString2}
          setValue={props.setInputString2}
          ariaLabel={"Player 2 input"}
        />
      </div>
      <button id="submit-button" onClick={() => handleSubmit()}>
        Submit
      </button>
    </div>
  );
}
