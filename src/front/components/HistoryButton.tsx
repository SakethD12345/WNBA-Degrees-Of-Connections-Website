import { Dispatch, SetStateAction, useState } from "react";
import "../styles/style.css";

interface HistoryButtonProps {
  PlayerOne: string;
  PlayerTwo: string;
  setInput1: Dispatch<SetStateAction<string>>;
  setInput2: Dispatch<SetStateAction<string>>;
  command: string;
}

export function HistoryButton(props: HistoryButtonProps) {
  const tempPlayers: string[] = [props.PlayerOne, props.PlayerTwo];
  const inputtedPlayers: string[] = [];
  inputtedPlayers[0] = tempPlayers[0].split("").toString().replaceAll(",", "");
  inputtedPlayers[1] = tempPlayers[1].slice(0);

  function handleSubmit(command: string) {
    let p1: string = "";
    let p2: string = "";
    let tempArray: string[] = command.split("between ");
    tempArray = tempArray[1].split(" and ");
    p1 = tempArray[0];
    tempArray = tempArray[1].split(" is");
    p2 = tempArray[0];
    props.setInput1(p1);
    props.setInput2(p2);
    console.log(p1 + " " + p2);
  }
  return (
    <button
      id={props.command}
      className="history-link"
      title="history-line"
      aria-label={props.command}
      tabIndex={0}
      onClick={() => handleSubmit(props.command)}
    >
      {props.command}
    </button>
  );
}
