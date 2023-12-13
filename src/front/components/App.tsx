import "../styles/style.css";
import { History } from "./History";
import { PlayerInput } from "./PlayerInput";
import { PlayerOutput } from "./PlayerOutput";
import { useState } from "react";

document.addEventListener("keydown", function (event) {
  //if command key or control key are held down
  if (event.ctrlKey || event.metaKey) {
    //using a switch here allows more controls to be added in the future
    switch (event.key) {
      case "i":
        //focuses on the input box so user can type in
        document.getElementById("input-box")!.focus();
        event.preventDefault();
        break;
      case "u":
        document.getElementById("abt-button")!.click();
        event.preventDefault();
        break;
      case "Enter":
        document.getElementById("submit-button")!.click();
        event.preventDefault();
        break;
    }

    //commands that are not combined with control/command
  } else {
    switch (event.key) {
      //scrolls up whole page
      case "ArrowUp":
        window.scrollBy(0, -10);
        break;

      //scroll down whole page
      case "ArrowDown":
        window.scrollBy(0, 10);
        break;
    }
  }
});

function App() {
  // useState for setting the history box
  const [history, setHistory] = useState<string[]>([]);

  // useState for a pair of players inputted
  const [inputtedPlayers, setInputtedPlayers] = useState<string[]>([
    "Player One",
    "Player Two",
  ]);

  // useState for the connections between the inputted players
  const [connectingPlayers, setConnectingPlayers] = useState<string[][]>([]);

  // useStates for the strings that go into the input boxes 1 and 2 respectively
  const [inputString1, setInputString1] = useState<string>("");
  const [inputString2, setInputString2] = useState<string>("");

  // useStatesfor the team of players 1 and 2 respectively
  const [currentTeam1, setCurrentTeam1] = useState<string>("");
  const [currentTeam2, setCurrentTeam2] = useState<string>("");

  // useStates for the message used to display the ticketting link
  const [ticket1, setTicket1] = useState<string>(
    "Enter two players to get their teammate connections!"
  );
  const [ticket2, setTicket2] = useState<string>(
    "Enter two players to get their teammate connections!"
  );

  return (
    // divided App into 3 parts, the history, the input, and the output
    <div className="App" id="app">
      <History
        history={history}
        inputString1={inputString1}
        setInputString1={setInputString1}
        inputString2={inputString2}
        setInputString2={setInputString2}
      />
      <div id="input-output">
        <PlayerInput
          inputString1={inputString1}
          setInputString1={setInputString1}
          inputString2={inputString2}
          setInputString2={setInputString2}
          history={history}
          setHistory={setHistory}
          inputtedPlayers={inputtedPlayers}
          setInputtedPlayers={setInputtedPlayers}
          connectingPlayers={connectingPlayers}
          setConnectingPlayers={setConnectingPlayers}
          setCurrentTeam1={setCurrentTeam1}
          setCurrentTeam2={setCurrentTeam2}
        />
        <PlayerOutput
          inputtedPlayers={inputtedPlayers}
          setInputtedPlayers={setInputtedPlayers}
          connectingPlayers={connectingPlayers}
          setConnectingPlayers={setConnectingPlayers}
          currentTeam1={currentTeam1}
          currentTeam2={currentTeam2}
          ticket1={ticket1}
          ticket2={ticket2}
          setTicket1={setTicket1}
          setTicket2={setTicket2}
        />
      </div>
    </div>
  );
}

export default App;
