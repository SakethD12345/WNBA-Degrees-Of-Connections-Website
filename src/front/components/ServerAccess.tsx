import { Dispatch, SetStateAction } from "react";
import "../styles/style.css";

interface ServerAccessProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;

  inputtedPlayers: string[];
  setInputtedPlayers: Dispatch<SetStateAction<string[]>>;

  connectingPlayers: string[][];
  setConnectingPlayers: Dispatch<SetStateAction<string[][]>>;

  setCurrentTeam1: Dispatch<SetStateAction<string>>;
  setCurrentTeam2: Dispatch<SetStateAction<string>>;
}

export async function makeConnection(
  PlayerOne: string,
  PlayerTwo: string,
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
          connections[i] = [];
          let tempJson = json[i + 1];
          if (i === 0) {
            if (tempJson["Player 1"] === PlayerOne) {
              connections[i][0] = tempJson["Player 1"];
              connections[i][1] = tempJson["Player 2"];
            } else {
              connections[i][1] = tempJson["Player 1"];
              connections[i][0] = tempJson["Player 2"];
            }
          } else {
            if (tempJson["Player 1"] === connections[i - 1][1]) {
              connections[i][0] = tempJson["Player 1"];
              connections[i][1] = tempJson["Player 2"];
            } else {
              connections[i][1] = tempJson["Player 1"];
              connections[i][0] = tempJson["Player 2"];
            }
          }
          connections[i][2] = tempJson["Team"];
          connections[i][3] = tempJson["Season"];
          connections[i][4] = i.toString();
          let tempString: string = tempJson["Team"];
          let tempStringArr = tempString.toLowerCase().split(" ");
          tempString = tempStringArr[0] + "-" + tempStringArr[1];
          connections[i][5] = tempString;
        }
        console.log(connections[0][2]);
        console.log(connections[json.count - 1][2]);
        props.setCurrentTeam1(connections[0][2]);
        props.setCurrentTeam2(connections[json.count - 1][2]);
        props.setConnectingPlayers(connections);
      }
    });
}

export async function getAllPlayers() {
  const response = await fetch("http://localhost:5555/dataset");
  const json = await response.json();
  const players: string[] = json.players;
  return players;
}

export async function getTicketingLink(team: string) {
  let link: string = "err";
  team.replace(" ", "%20");
  await fetch("http://localhost:5555/ticketing?team=" + team)
    .then((response) => response.json())
    .then((json) => {
      if (json.result === "error") {
        link = json.error;
      } else {
        link = json.ticketing;
      }
    });

  return link;
}
