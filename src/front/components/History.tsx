import { Dispatch, SetStateAction, useState } from "react";
import "../styles/style.css";

interface HistoryProps {
  history: string[];

  inputString1: string;
  setInputString1: Dispatch<SetStateAction<string>>;

  inputString2: string;
  setInputString2: Dispatch<SetStateAction<string>>;
}
//This function builds the history
export function History(props: HistoryProps) {
  const [searches, setSearches] = useState<string[][]>([]);
  function handleSubmit() {}
  return (
    <div aria-label="History" id="history" className="history" title="history">
      <h2 id="history-header">Search History</h2>
      {}
      {props.history.map((command) => (
        <button
          className="history-link"
          title="history-line"
          aria-label={command}
          tabIndex={0}
          onClick={() => handleSubmit()}
        >
          {command}
        </button>
      ))}
    </div>
  );
}
