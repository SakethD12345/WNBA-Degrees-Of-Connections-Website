import "../styles/style.css";
import { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllPlayers } from "./ServerAccess";

interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

// input area for strings
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  //set state for filtered players
  const [filteredPlayers, setFilteredPlayers] = useState<string[]>([]);
  const [players, setPlayers] = useState<string[]>([]);


  //fetches the list of all players from the backend
  useEffect(() => {
    const fetchData = async () => {
      const result: string[] = await getAllPlayers();
      setPlayers(result);
    };

    fetchData();
  }, []);

  //UseEffect that handles input change
  const handleInputChange = (inputValue: string) => {
    //filters player names down to only values with the given input
    const filtered = players.filter((player) =>
      player.toLowerCase().includes(inputValue.toLowerCase())
    );
    //cut list off at 20 players
    const limitedFilteredPlayers = filtered.slice(0, 20);

    //set the filtered players for the dropdown and save inputted information
    setFilteredPlayers(limitedFilteredPlayers);
    setValue(inputValue);
  };

  const handlePlayerSelection = (selectedPlayer: string) => {
    setValue(selectedPlayer);
    setFilteredPlayers([]);
  };

  return (
    <div>
      <input
        id="input-box"
        type="text"
        className="player-input-box"
        value={value}
        placeholder="Enter a player here!"
        onChange={(ev) => handleInputChange(ev.target.value)}
        aria-label={ariaLabel}
      />
      {filteredPlayers.length > 0 && (
        <ul id="player-dropdown">
          {filteredPlayers.map((player) => (
            <li key={player} onClick={() => handlePlayerSelection(player)}>
              {player}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
