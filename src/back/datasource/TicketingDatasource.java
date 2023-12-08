package src.back.datasource;

import com.squareup.moshi.JsonReader;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import okio.BufferedSource;
import okio.Okio;
import org.eclipse.jetty.util.DateCache;
import src.back.exception.DatasourceException;
import src.back.graph.Edge;
import src.back.handler.TicketingHandler;

import javax.imageio.IIOException;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.*;

public class TicketingDatasource implements Datasource {
    private Map<String, String> ticketing;
    public TicketingDatasource() {
        try {
            String data = "src/data/ticketing.json";
            Moshi moshi = new Moshi.Builder().build();
            BufferedSource bufferedSource = Okio.buffer(Okio.source(
                    new File(data)));
            JsonReader jsonReader = JsonReader.of(bufferedSource);
            this.ticketing = moshi.adapter(Tickets.class).fromJson(jsonReader).ticketing();
        } catch (IOException e) {
            System.out.println(":(");
        }

    }
    public String getTicketing(String team) throws DatasourceException {
        if (this.ticketing.containsKey(team)) {
            if (this.ticketing.get(team).isEmpty()) {
                throw new DatasourceException("Team no longer exists.");
            } else {
                return this.ticketing.get(team);
            }
        } else {
            throw new DatasourceException("Team name invalid.");
        }
    }
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
