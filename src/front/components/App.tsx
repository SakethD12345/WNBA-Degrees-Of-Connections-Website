import "../styles/style.css";
import { History } from "./History";
import { PlayerInput } from "./PlayerInput";
import { PlayerOutput } from "./PlayerOutput";
import { useState } from "react";

function App() {
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([]);
  const [player1Logo, setPlayer1Logo] = useState<string>(
    "https://static.vecteezy.com/system/resources/previews/012/996/778/non_2x/sport-ball-basketball-line-art-free-png.png"
  );
  const [player2Logo, setPlayer2Logo] = useState<string>(
    "https://static.vecteezy.com/system/resources/previews/012/996/778/non_2x/sport-ball-basketball-line-art-free-png.png"
  );

  return (
    <div className="App" id="app">
      <History history={history} />
      <div id="input-output">
        <PlayerInput
          history={history}
          setHistory={setHistory}
          output={output}
          setOutput={setOutput}
          setPlayer1Logo={setPlayer1Logo}
          setPlayer2Logo={setPlayer2Logo}
        />
        <PlayerOutput
          output={output}
          setOutput={setOutput}
          player1Logo={player1Logo}
          setPlayer1Logo={setPlayer1Logo}
          player2Logo={player2Logo}
          setPlayer2Logo={setPlayer2Logo}
        />
      </div>
    </div>
  );
}

export default App;
