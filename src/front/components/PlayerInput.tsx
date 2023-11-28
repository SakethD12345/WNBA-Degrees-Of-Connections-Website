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
      <legend>Enter a player:</legend>
      <ControlledInput
        value={inputString}
        setValue={setInputString}
        ariaLabel={"Player input"}
      />
    </div>
  );
}
