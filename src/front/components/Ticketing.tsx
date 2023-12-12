import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { getTicketingLink } from "./ServerAccess";

interface TicketButtonProps {
  team1: string;
  team2: string;

  ticket1: string;
  ticket2: string;
  setTicket1: Dispatch<SetStateAction<string>>;
  setTicket2: Dispatch<SetStateAction<string>>;
}

export function Ticketing(props: TicketButtonProps) {
  const [link1, setLink1] = useState<string>("");
  const [link2, setLink2] = useState<string>("");

  useEffect(() => {
    const fetchLinks = async () => {
      if (props.team1 !== "") {
        setLink1(await getTicketingLink(props.team1));
      }

      if (props.team2 !== "") {
        setLink2(await getTicketingLink(props.team2));
      }
    };

    fetchLinks();
  }, [props.team1, props.team2]);
  const ticket1Message = useMemo(() => {
    if (link1 === "Team no longer exists.") {
      return "The " + props.team1 + " no longer exists!";
    } else if (link1 === "") {
      return "WNBA Site Here";
    } else {
      return "Tickets for the " + props.team1 + " here!";
    }
  }, [link1, props.team1]);

  const ticket2Message = useMemo(() => {
    if (link2 === "Team no longer exists.") {
      return "The " + props.team2 + " no longer exists!";
    } else if (link2 === "") {
      return "WNBA Site Here";
    } else {
      return "Tickets for the " + props.team2 + " here!";
    }
  }, [link2, props.team2]);

  return (
    <div id="ticketing">
      <div id="team1-tickets">
        <a id="ticket-link1" href={link1}>
          {ticket1Message}
        </a>
      </div>
      <div id="team2-tickets">
        <a id="ticket-link2" href={link2}>
          {ticket2Message}
        </a>
      </div>
    </div>
  );
}
