package src.back.datasource;

import com.squareup.moshi.JsonReader;
import com.squareup.moshi.Moshi;
import okio.BufferedSource;
import okio.Okio;
import src.back.exception.DatasourceException;
import src.back.graph.Edge;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * This is the ticketingDatasource. It implements Datasource and is used on the front
 * end to receive a link to ticketing information given a team name.
 */
public class TicketingDatasource implements Datasource {
    private Map<String, String> ticketing;

    //access files that hold information on ticketing, compile into hashmap
    public TicketingDatasource() {
        try {
            String data = "src/data/ticketing.json";
            Moshi moshi = new Moshi.Builder().build();
            BufferedSource bufferedSource = Okio.buffer(Okio.source(
                    new File(data)));
            JsonReader jsonReader = JsonReader.of(bufferedSource);
            this.ticketing = moshi.adapter(Tickets.class).fromJson(jsonReader).ticketing();
        } catch (IOException e) {
            System.out.println("IO Exception!!");
        }
    }

    /**
     * This is the getTicketing method. It is a public getter method that is responsible for
     * returning the link to get tickets for a given team name. It uses the hashmap that was
     * created to achieve this.
     * @param team team name whose tickets we are looking for
     * @return link to the tickets
     * @throws DatasourceException thrown if a team name is invalid, or team no longer exists
     */
    public String getTicketing(String team) throws DatasourceException {
        if (this.ticketing.containsKey(team)) {
            if (this.ticketing.get(team).isEmpty()) {
                //thrown is a team name no longer exists
                throw new DatasourceException("Team no longer exists.");
            } else {
                return this.ticketing.get(team);
            }
        } else {
            //team name doesn't exist in known info
            throw new DatasourceException("Team name invalid.");
        }
    }

    //artifacts of interface
    public ArrayList<Edge> getConnection(String playerName1, String playerName2) throws DatasourceException {
        return null;
    }
    public Set<String> getPlayers() {
        return null;
    }
    public HashMap<String, ArrayList<Edge>> getMap() {
        return null;
    }
}
