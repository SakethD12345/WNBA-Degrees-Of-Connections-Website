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

// custom component to set links to go to the website of the team that the players played on in
// that connection
export function Ticketing(props: TicketButtonProps) {
  const [link1, setLink1] = useState<string>("");
  const [link2, setLink2] = useState<string>("");

  const [temp1, setTemp1] = useState<string>("");
  const [temp2, setTemp2] = useState<string>("");

  // useEffect to rerender whenever team1 or team2 is updated
  useEffect(() => {
    const fetchLinks = async () => {
      if (props.team1 !== "") {
        setTemp1(await getTicketingLink(props.team1));
      }

      if (props.team2 !== "") {
        setTemp2(await getTicketingLink(props.team2));
      }
    };

    fetchLinks();
  }, [props.team1, props.team2]);

  // useMemo for ticket1 to make sure that the page is only rerendered when absolutely necessary
  const ticket1Message = useMemo(() => {
    if (temp1 === "Team no longer exists.") {
      setLink1("https:/wnba.com");
      return "The " + props.team1 + " no longer exists!";
    } else if (temp1 === "") {
      setLink1("https:/wnba.com");
      return "WNBA Site Here";
    } else {
      setLink1(temp1);
      return "Tickets for the " + props.team1 + " here!";
    }
  }, [temp1, props.team1]);

  // useMemo for ticket2 to make sure that the page is only rerendered when absolutely necessary
  const ticket2Message = useMemo(() => {
    if (temp2 === "Team no longer exists.") {
      setLink2("https:/wnba.com");
      return "The " + props.team2 + " no longer exists!";
    } else if (temp2 === "") {
      setLink2("https:/wnba.com");
      return "WNBA Site Here";
    } else {
      setLink2(temp2);
      return "Tickets for the " + props.team2 + " here!";
    }
  }, [temp2, props.team2]);

  // returns two links, to the ticket site if applicable, to the wnba home if not
  return (
    <div id="ticketing">
      <a className="ticket-link" id="ticket-link1" href={link1}>
        <p>{ticket1Message}</p>
      </a>
      <a className="ticket-link" id="ticket-link2" href={link2}>
        <p>{ticket2Message}</p>
      </a>
    </div>
  );
}
