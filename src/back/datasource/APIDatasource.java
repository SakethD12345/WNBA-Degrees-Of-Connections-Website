package src.back.datasource;

import com.squareup.moshi.*;
import okio.BufferedSource;
import okio.Okio;
import src.back.exception.DatasourceException;
import src.back.graph.Connection;
import src.back.graph.Edge;

import java.io.*;
import java.util.*;


/**
 * This is the APIDatasource class. It is responsible for creating the graph and handling
 * the logic of searching the graph.
 */
public class APIDatasource implements Datasource {
    //define hashmap that holds a players name to its node
    private HashMap<String, ArrayList<Edge>> nameToNode;

    /**
     * The constructor creates the hashmap and generates the graph object using helper method
     */
    public APIDatasource() {
        this.nameToNode = new HashMap<>();
        this.generateGraph();
    }


    /**
     * This is the getConnection method. It is responsible for getting the list of edges that
     * define the connections between WNBA players. It does this using a BFS implementation.
     *
     * @param playerName1 the name of the first player
     * @param playerName2 the name of the second player
     * @return list of edges that define the connections between players
     */
    public ArrayList<Edge> getConnection (String playerName1, String playerName2)
            throws DatasourceException {
        //throws error if no names are entered
        if (playerName1 == null || playerName2 == null || playerName1.equals(playerName2)) {
            throw new DatasourceException("Only one player submitted.");
        }

        //check if players are not in the list
        if (!this.nameToNode.containsKey(playerName1)) {
            // return error
            throw new DatasourceException("Invalid first player.");
        }
        if (!this.nameToNode.containsKey(playerName2)) {
            // return error
            throw new DatasourceException("Invalid second player.");
        }

        //set up objects for BFS
        ArrayList<String> toCheck = new ArrayList<>();
        ArrayList<String> visited = new ArrayList<>();
        HashMap<String, String> cameFrom = new HashMap<>();
        ArrayList<Edge> connection = new ArrayList<>();
        toCheck.add(playerName1);
        visited.add(playerName1);

        //BFS
        while (!toCheck.isEmpty()) {
            String checkingPlayer = toCheck.remove(0);
            ArrayList<String> teammates = new ArrayList<>();
                for (Edge edge: this.nameToNode.get(checkingPlayer)) {
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

    /**
     * This is the connectionHelper method. It is a private helper that is used to help finalize
     * the list of connections given the hashmap that describes the most efficient route.
     *
     * @param currentConnection the current list of connection, will be added onto recursively
     * @param cameFrom map that describes the most efficient route for each node
     * @param currentPlayer current player we are looking to connect
     * @param origPlayer original player we were looking to connect
     * @return list of edges that describe the final connection
     */
    private ArrayList<Edge> connectionHelper(ArrayList<Edge> currentConnection,
                                             HashMap<String, String> cameFrom,
                                             String currentPlayer, String origPlayer) {
        if (currentPlayer.equals(origPlayer)) {
            return currentConnection;
        }
        String nextPlayer = cameFrom.get(currentPlayer);
        currentConnection = this.connectionHelper(currentConnection, cameFrom, nextPlayer, origPlayer);
        Edge connect = new Edge(null, null, null);
        for (Edge edge: this.nameToNode.get(nextPlayer)) {
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
            //loop thru each year's file
            for (int i = 1997; i <= 2023; i++) {
                counter = i;
                String data = "src/data/" + i + ".json";
                Moshi moshi = new Moshi.Builder().build();
                BufferedSource bufferedSource = Okio.buffer(Okio.source(
                        new File(data)));
                JsonReader jsonReader = JsonReader.of(bufferedSource);
                Season season = moshi.adapter(Season.class).fromJson(jsonReader);
                //loop thru each team
                for (Team team: season.teams()) {
                    List<String> roster = team.roster();
                    //loop thru each player on the team
                    for (int j = 0; j < roster.size(); j++) {
                        String player = roster.get(j);
                        //if name not in hashmap, add it
                        if (!this.nameToNode.containsKey(player)) {
                            this.nameToNode.put(player, new ArrayList<>());
                        }
                    }
                    //add connections for each player given team name and season
                    for (int k = 0; k < roster.size(); k++) {
                        String player1 = roster.get(k);
                        for (int l = k + 1; l < roster.size(); l++) {
                            String player2 = roster.get(l);
                            Edge edge = new Edge(player1, player2, new Connection(team.name(), season.season()));
                            this.nameToNode.get(player1).add(edge);
                            this.nameToNode.get(player2).add(edge);
                        }
                    }
                }
            }
        }
        //catch any possible exceptions
        catch (FileNotFoundException e) {
            System.out.println("File not found!!");
        }
        catch (IOException e) {
            System.out.println("IO exception!!");
            System.out.println(counter);
        }
    }

    /**
     * This is the getPlayers method. This returns the set of all players that have played in
     * the WNBA. This is defined in the user stories but is also used in the front end.
     *
     * @return set of strings of all WNBA players names
     */
    public Set<String> getPlayers() {
        return this.nameToNode.keySet();
    }

    /**
     * This is the getMap method. It is a public getter method that returns the whole hashmap
     * of player names to the arrayList of edges that they have.
     *
     * @return hashmap of player name to their list of edges (teammates)
     */
    public HashMap<String, ArrayList<Edge>> getMap() {
        return this.nameToNode;
    }

    /**
     * This is the getTicketing method. It takes in a string with the team names and gets the
     * link to the ticketing.
     *
     * @param team string representing the teams name.
     * @return string representing the link to the ticketing page
     */
    public String getTicketing(String team) {
        return null;
    }
}



