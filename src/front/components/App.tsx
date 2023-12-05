import "../styles/style.css";
import { History } from "./History";
import { PlayerInput } from "./PlayerInput";
import { PlayerOutput } from "./PlayerOutput";
import { useState } from "react";

function App() {
  const [history, setHistory] = useState<string[]>([]);

  return (
    <div className="App" id="app">
      <History history={history} />
      <div id="input-output">
        <PlayerInput history={history} setHistory={setHistory} />
        <PlayerOutput />
      </div>
    </div>
  );
}

export default App;