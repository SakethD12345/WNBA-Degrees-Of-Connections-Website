package src.back.handler;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import spark.Request;
import spark.Response;
import spark.Route;
import src.back.datasource.Datasource;
import src.back.exception.DatasourceException;
import src.back.graph.Edge;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * This the ConnectionHandler class. It is the broadest backend access point that
 * takes in two players names and returns a JSON that represents the connections
 * between them.
 */
public class ConnectionHandler implements Route {
    private Datasource datasource;

    /**
     * Constructor takes in the datasource as a parameter
     * @param datasource datasource we are accessing
     */
    public ConnectionHandler(Datasource datasource) {
        this.datasource = datasource;
    }

    /**
     * This is the handle method. It is the method necessary for the Route interface.
     * It handles a given request and returns that information.
     *
     * @param request requested information
     * @param response n/a for this application
     * @return json with necessary information
     */
    public Object handle(Request request, Response response) {
        Moshi moshi = new Moshi.Builder().build();
        Type mapObject = Types.newParameterizedType(Map.class, String.class, Object.class);
        JsonAdapter<Map<String, Object>> mapAdapter = moshi.adapter(mapObject);
        Map<String, Object> responseMap = new HashMap<>();

        String player1 = request.queryParams("player1");
        String player2 = request.queryParams("player2");

        try {
            ArrayList<Edge> data = this.datasource.getConnection(player1, player2);
            if (data.isEmpty()) {
                responseMap.put("result", "failure");
            } else {
                responseMap.put("result", "success");
                int counter = 0;
                for (Edge edge: data) {
                    counter ++;
                    responseMap.put(Integer.toString(counter), edge.toMap());
                }
                responseMap.put("count", Integer.toString(counter));
            }
        } catch (DatasourceException e) {
            responseMap.put("result", "error");
            responseMap.put("error", e.getMessage());
        }
        return mapAdapter.toJson(responseMap);
    }
}
