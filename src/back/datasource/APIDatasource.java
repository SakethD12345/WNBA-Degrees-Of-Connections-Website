package src.back.datasource;

import com.squareup.moshi.*;
import okio.BufferedSource;
import okio.Okio;
import src.back.exception.DatasourceException;
import src.back.graph.Connection;
import src.back.graph.Edge;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;

/**
 * This class implements the Datasource class and its 4 corresponding methods.
 * The class creates the hashmap for converting the state names to codes along with the cache that stores state name to
 * county name to county code
 */
public class APIDatasource implements Datasource {
    private HashMap<String, ArrayList<Edge>> nameToNode;

    /**
     * The constructor builds the cache and defines its properties
     */
    public APIDatasource() {
        this.nameToNode = new HashMap<>();
        this.generateGraph();
    }

    /**
     * This method gives the program the ability to connect with a given URL
     * @param requestURL is the given URL
     * @return the connection
     * @throws DatasourceException
     * @throws IOException
     */
    public static HttpURLConnection connect(URL requestURL) throws DatasourceException, IOException {
        URLConnection urlConnection = requestURL.openConnection();
        if (!(urlConnection instanceof HttpURLConnection clientConnection))
            throw new DatasourceException("unexpected: result of connection wasn't HTTP");
        clientConnection.connect(); // GET
        if (clientConnection.getResponseCode() != 200)
            throw new DatasourceException("unexpected: API connection not success status " +
                    clientConnection.getResponseMessage());
        return clientConnection;
    }

    /**
     * generate the actual connection: we
     * @param playerName1
     * @param playerName2
     * @return
     */
    public ArrayList<Edge> getConnection (String playerName1, String playerName2) {
        if (playerName1.equals(playerName2)) {
            return new ArrayList<>();
        }
        if (!nameToNode.containsKey(playerName1)) {
            // return error
            System.out.println("Invalid first player.");
        }
        if (!nameToNode.containsKey(playerName2)) {
            // return error
            System.out.println("Invalid second player");
        }
        ArrayList<String> toCheck = new ArrayList<>();
        ArrayList<String> visited = new ArrayList<>();
        HashMap<String, String> cameFrom = new HashMap<>();
        ArrayList<Edge> connection = new ArrayList<>();

        toCheck.add(playerName1);
        visited.add(playerName1);

        while (!toCheck.isEmpty()) {
            String checkingPlayer = toCheck.remove(0);
            ArrayList<String> teammates = new ArrayList<>();
                for (Edge edge: nameToNode.get(checkingPlayer)) {
                    String teammate = edge.getOppositePlayer(checkingPlayer);
                    if (!teammates.contains(teammate)) {
                        teammates.add(teammate);
                    }
                }

            if (playerName2.equals(checkingPlayer)) {
                connection = this.connectionHelper(connection, cameFrom, playerName2, playerName1);
            }
            for (String link: teammates) {
                if (!visited.contains(link)) {
                    visited.add(link);
                    toCheck.add(link);
                    cameFrom.put(link, checkingPlayer);
                }
            }
        }
        return connection;
    }

    private ArrayList<Edge> connectionHelper(ArrayList<Edge> currentConnection, HashMap<String, String> cameFrom, String currentPlayer, String origPlayer) {
        if (currentPlayer.equals(origPlayer)) {
            return currentConnection;
        }
        String nextPlayer = cameFrom.get(currentPlayer);
        currentConnection = this.connectionHelper(currentConnection, cameFrom, nextPlayer, origPlayer);
        Edge connect = new Edge(null, null, null);
        for (Edge edge: nameToNode.get(nextPlayer)) {
            if (edge.getOppositePlayer(nextPlayer).equals(currentPlayer)) {
                connect = edge;
            }
        }
        currentConnection.add(connect);
        return currentConnection;
    }

    /**
     * generate the actual graph: get data, create Nodes, Edges
     */
    public void generateGraph() {
        int counter = 0;
        try {
            for (int i = 1997; i <= 2023; i++) {
                counter = i;
                String data = "src/data/" + i + ".json";
                Moshi moshi = new Moshi.Builder().build();
                BufferedSource bufferedSource = Okio.buffer(Okio.source(
                        new File(data)));
                JsonReader jsonReader = JsonReader.of(bufferedSource);
                Season season = moshi.adapter(Season.class).fromJson(jsonReader);
                for (Team team: season.teams()) {
                    List<String> roster = team.roster();
                    for (int j = 0; j < roster.size(); j++) {
                        String player = roster.get(j);
                        if (!nameToNode.containsKey(player)) {
                            nameToNode.put(player, new ArrayList<>());
                        }
                    }
                    for (int k = 0; k < roster.size(); k++) {
                        String player1 = roster.get(k);
                        for (int l = k + 1; l < roster.size(); l++) {
                            String player2 = roster.get(l);
                            Edge edge = new Edge(player1, player2, new Connection(team.name(), season.season()));
                            nameToNode.get(player1).add(edge);
                            nameToNode.get(player2).add(edge);
                        }
                    }
                }
            }
        }
        catch (FileNotFoundException e) {
            System.out.println(":(");
        }
        catch (IOException e) {
            System.out.println(":((");
            System.out.println(counter);
        }
    }
}



