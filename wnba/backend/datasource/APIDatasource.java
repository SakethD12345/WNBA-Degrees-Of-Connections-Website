package wnba.backend.datasource;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import okio.Buffer;
import wnba.backend.exception.DatasourceException;
import wnba.backend.graph.Edge;
import wnba.backend.graph.Node;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * This class implements the Datasource class and its 4 corresponding methods.
 * The class creates the hashmap for converting the state names to codes along with the cache that stores state name to
 * county name to county code
 */
public class APIDatasource implements Datasource {
    private static HashMap<String, String> stateCodes;
    private Cache<String, HashMap<String, String>> countyCache;
    private Boolean stateCodesGenerated;

    /**
     * The constructor builds the cache and defines its properties
     */
    public APIDatasource() {
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

    }




}



