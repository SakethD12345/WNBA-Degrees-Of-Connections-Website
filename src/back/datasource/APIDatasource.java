package src.back.datasource;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.JsonReader;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import okio.Buffer;
import okio.BufferedSource;
import okio.Okio;
import src.back.exception.DatasourceException;
import src.back.graph.Connection;
import src.back.graph.Edge;
import src.back.graph.Node;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * This class implements the Datasource class and its 4 corresponding methods.
 * The class creates the hashmap for converting the state names to codes along with the cache that stores state name to
 * county name to county code
 */
public class APIDatasource implements Datasource {
    private ArrayList<Node> nodes;
    private HashMap<String, Node> nameToNode;

    /**
     * The constructor builds the cache and defines its properties
     */
    public APIDatasource() {
        this.nodes = new ArrayList<Node>();
        this.nameToNode = new HashMap<>();
        this.generateGraph();
        for (Node node: this.nodes) {
            node.print();
        }
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
     * @param player1
     * @param player2
     * @return
     */
    public ArrayList<Edge> getConnection (Node player1, Node player2) {

        return null;
    }

    /**
     * generate the actual graph: get data, create Nodes, Edges
     */
    public void generateGraph() {
        try {
            for (int i = 1997; i <= 2023; i++) {
                String data = "wnba/data/" + i + ".json";
                Moshi moshi = new Moshi.Builder().build();
                BufferedSource bufferedSource = Okio.buffer(Okio.source(
                        new File(data)));
                JsonReader jsonReader = JsonReader.of(bufferedSource);
                Season season = moshi.adapter(Season.class).fromJson(jsonReader);
                for (Team team: season.teams()) {
                    List<String> roster = team.roster();
                    ArrayList<Node> players = new ArrayList<>();
                    for (int j = 0; j < roster.size(); j++) {
                        String player = roster.get(j);
                        if (!nameToNode.containsKey(player)) {
                            Node node = new Node(player, new ArrayList<>());
                            this.nodes.add(node);
                            players.add(node);
                            nameToNode.put(player, node);
                        } else {
                            players.add(nameToNode.get(player));
                        }
                    }
                    for (int k = 0; k < players.size(); k++) {
                        Node player1 = players.get(k);
                        for (int l = k + 1; l < players.size(); l++) {
                            Node player2 = players.get(l);
                            Edge edge = new Edge(player1, player2, new Connection(team.name(), season.season()));
                            player1.addEdge(edge);
                            player2.addEdge(edge);
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
        }
    }




}



