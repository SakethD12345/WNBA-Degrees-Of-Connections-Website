import "../styles/style.css";
import { Dispatch, SetStateAction, useState } from "react";

interface PlayerInputProps {
  output: string[];
  setOutput: Dispatch<SetStateAction<string[]>>;
}

export function PlayerOutput(props: PlayerInputProps) {
  return <div id="player-output"></div>;
}
