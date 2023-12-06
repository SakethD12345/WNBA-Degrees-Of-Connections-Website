import "../styles/style.css";
import { Dispatch, SetStateAction, useState } from "react";

interface PlayerInputProps {
  output: string[];
  setOutput: Dispatch<SetStateAction<string[]>>;

  player1Logo: string;
  setPlayer1Logo: Dispatch<SetStateAction<string>>;

  player2Logo: string;
  setPlayer2Logo: Dispatch<SetStateAction<string>>;
}

export function PlayerOutput(props: PlayerInputProps) {
  return (
    <div id="player-output">
      <div id="players">
        <div id="player-one-output">
          <img id="player-one-logo" src={props.player1Logo} />
          <p className="player-name">Player One</p>
        </div>
        <div id="player-two-output">
          <img id="player-two-logo" src={props.player2Logo} />
          <p className="player-name">Player Two</p>
        </div>
      </div>
      <div id="results"></div>
    </div>
  );
}
