import { Dispatch, SetStateAction } from "react";
import "../styles/style.css";

interface ServerAccessProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;

  inputtedPlayers: string[];
  setInputtedPlayers: Dispatch<SetStateAction<string[]>>;

  connectingPlayers: string[][];
  setConnectingPlayers: Dispatch<SetStateAction<string[][]>>;

  setPlayer1Logo: Dispatch<SetStateAction<string>>;
  setPlayer2Logo: Dispatch<SetStateAction<string>>;
}

export async function makeConnection(
  PlayerOne: string,
  PlayerTwo: string,
  isValidCall: boolean,
  count: number,
  props: ServerAccessProps
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
        props.setInputtedPlayers([PlayerOne, PlayerTwo]);
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
        let connections: string[][] = [];
        for (let i = 0; i < json.count; i++) {
          connections[i] = json[i + 1];
        }
        console.log(connections);
        props.setConnectingPlayers(connections);
      }
    });
}
