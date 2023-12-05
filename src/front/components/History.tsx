import "../styles/style.css";

interface HistoryProps {
  history: string[];
}
//This function builds the history
export function History(props: HistoryProps) {
  return (
    <div
      aria-label="History"
      id="history"
      className="history"
      title="history"
      tabIndex={0}
    >
      <h2 id="history-header">Search History</h2>
      {props.history.map((command) => (
        <p title="history-line" aria-label={command} tabIndex={0}>
          {command}
        </p>
      ))}
    </div>
  );
}
