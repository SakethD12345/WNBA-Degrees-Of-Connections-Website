import "../styles/style.css";
import { Dispatch, SetStateAction, useState } from "react";
import { teamColors } from "../../data/colors";
import { Ticketing } from "./Ticketing";

interface PlayerOutputProps {
  inputtedPlayers: string[];
  setInputtedPlayers: Dispatch<SetStateAction<string[]>>;

  connectingPlayers: string[][];
  setConnectingPlayers: Dispatch<SetStateAction<string[][]>>;

  currentTeam1: string;
  currentTeam2: string;

  ticket1: string;
  ticket2: string;
  setTicket1: Dispatch<SetStateAction<string>>;
  setTicket2: Dispatch<SetStateAction<string>>;
}

export function PlayerOutput(props: PlayerOutputProps) {
  return (
    <div id="player-output">
      <Ticketing
        team1={props.currentTeam1}
        team2={props.currentTeam2}
        ticket1={props.ticket1}
        ticket2={props.ticket2}
        setTicket1={props.setTicket1}
        setTicket2={props.setTicket2}
      />
      <div id="players">
        <div id="player-one-output">
          <p className="player-name">{props.inputtedPlayers[0]}</p>
        </div>
        <div id="player-two-output">
          <p className="player-name">{props.inputtedPlayers[1]}</p>
        </div>
      </div>
      <div id="results">
        {props.connectingPlayers.map((row: string[], index) => (
          <div
            key={index}
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
