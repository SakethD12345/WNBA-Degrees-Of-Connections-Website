package src.back.handler;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import src.back.datasource.Datasource;
import src.back.exception.DatasourceException;
import spark.Request;
import spark.Response;
import spark.Route;

import java.io.IOException;
import java.lang.reflect.Type;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.common.cache.Cache;
import src.back.graph.Edge;

/**
 * This class deals with getting the broadband percentage
 */
public class ConnectionHandler implements Route {
    private Datasource datasource;

    /**
     * The constructor builds a broadband handler with a cache and the datasource
     * @param datasource is the data source
     */
    public ConnectionHandler(Datasource datasource) {
        this.datasource = datasource;
    }
    /**
     * This method gets the state and county names and gets the broadband percentage
     * @param request is the request
     * @param response is the response
     * @return a 2D JSon Array
     */
    public Object handle(Request request, Response response) {
        Moshi moshi = new Moshi.Builder().build();
        Type mapObject = Types.newParameterizedType(Map.class, String.class, Object.class);
        JsonAdapter<Map<String, Object>> mapAdapter = moshi.adapter(mapObject);
        Map<String, Object> responseMap = new HashMap<>();

        String player1 = request.queryParams("player1");
        String player2 = request.queryParams("player2");

        ArrayList<Edge> data = this.datasource.getConnection(player1, player2);
        int counter = 0;
        for (Edge edge: data) {
            counter ++;
            responseMap.put(Integer.toString(counter), edge.toMap());

        }
        responseMap.put("count", Integer.toString(counter));
        return mapAdapter.toJson(responseMap);
    }
}
