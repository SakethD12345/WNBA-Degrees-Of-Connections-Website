import "../styles/style.css";
import { History } from "./History";
import { PlayerInput } from "./PlayerInput";
import { PlayerOutput } from "./PlayerOutput";
import { useState } from "react";

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
