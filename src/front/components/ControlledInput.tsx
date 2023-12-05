import "../styles/style.css";
import { Dispatch, SetStateAction } from "react";

interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      id="input-box"
      type="text"
      className="player-input-box"
      value={value}
      placeholder="Enter a player here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}
