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
      case "j":
        document.getElementById("history")!.focus();
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

      //presses submit when enter pressed
      case "Enter":
        document.getElementById("submit-button")!.click();
        event.preventDefault();
        break;
    }
  }
});

function App() {
  const [history, setHistory] = useState<string[]>([]);
  const [inputtedPlayers, setInputtedPlayers] = useState<string[]>([
    "Player One",
    "Player Two",
  ]);
  const [connectingPlayers, setConnectingPlayers] = useState<string[][]>([]);
  const [player1Logo, setPlayer1Logo] = useState<string>(
    "https://static.vecteezy.com/system/resources/previews/012/996/778/non_2x/sport-ball-basketball-line-art-free-png.png"
  );
  const [player2Logo, setPlayer2Logo] = useState<string>(
    "https://static.vecteezy.com/system/resources/previews/012/996/778/non_2x/sport-ball-basketball-line-art-free-png.png"
  );

  const [inputString1, setInputString1] = useState<string>("");
  const [inputString2, setInputString2] = useState<string>("");

  return (
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
          setPlayer1Logo={setPlayer1Logo}
          setPlayer2Logo={setPlayer2Logo}
          connectingPlayers={connectingPlayers}
          setConnectingPlayers={setConnectingPlayers}
        />
        <PlayerOutput
          inputtedPlayers={inputtedPlayers}
          setInputtedPlayers={setInputtedPlayers}
          player1Logo={player1Logo}
          setPlayer1Logo={setPlayer1Logo}
          player2Logo={player2Logo}
          setPlayer2Logo={setPlayer2Logo}
          connectingPlayers={connectingPlayers}
          setConnectingPlayers={setConnectingPlayers}
        />
      </div>
    </div>
  );
}

export default App;
