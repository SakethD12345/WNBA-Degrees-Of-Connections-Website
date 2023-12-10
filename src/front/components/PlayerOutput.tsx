import "../styles/style.css";
import { Dispatch, SetStateAction, useState } from "react";
import { teamColors } from "../../data/colors";

interface PlayerOutputProps {
  inputtedPlayers: string[];
  setInputtedPlayers: Dispatch<SetStateAction<string[]>>;

  connectingPlayers: string[][];
  setConnectingPlayers: Dispatch<SetStateAction<string[][]>>;

  player1Logo: string;
  setPlayer1Logo: Dispatch<SetStateAction<string>>;

  player2Logo: string;
  setPlayer2Logo: Dispatch<SetStateAction<string>>;
}

export function PlayerOutput(props: PlayerOutputProps) {
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
      <div id="results">
        {props.connectingPlayers.map((row: string[]) => (
          <div
            className="connecting-player-div"
            id={row[5]}
            style={{ backgroundColor: teamColors.get(row[2]) }}
          >
            {row[0]} played with {row[1]} on the {row[2]} in {row[3]}
          </div>
        ))}
      </div>
    </div>
  );
}
