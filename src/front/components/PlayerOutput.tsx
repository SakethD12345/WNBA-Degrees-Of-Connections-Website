import "../styles/style.css";
import { Dispatch, SetStateAction, useState } from "react";

interface PlayerInputProps {
  inputtedPlayers: string[];
  setInputtedPlayers: Dispatch<SetStateAction<string[]>>;

  connectingPlayers: string[][];
  setConnectingPlayers: Dispatch<SetStateAction<string[][]>>;

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
          <p className="player-name">{props.inputtedPlayers[0]}</p>
        </div>
        <div id="player-two-output">
          <img id="player-two-logo" src={props.player2Logo} />
          <p className="player-name">{props.inputtedPlayers[1]}</p>
        </div>
      </div>
      <div id="results"></div>
    </div>
  );
}
