package src.back.handler;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import spark.Request;
import spark.Response;
import spark.Route;
import src.back.datasource.Datasource;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

/**
 * This is the DatasetHandler class. It is the necessary handler class that is used when
 * accessing the large list of players in the league.
 */
public class DatasetHandler implements Route {
    private Datasource datasource;

    /**
     * Constructor takes in the datasource object
     *
     * @param datasource datasource object
     */
    public DatasetHandler(Datasource datasource) {
        this.datasource = datasource;
    }

    /**
     * This is the handle method. It is defined from the route interface. It takes in the
     * necessary parameters and produces a json as a response.
     *
     * @param request requested information
     * @param response n/a for this application
     * @return JSON with all players
     */
    public Object handle(Request request, Response response) {
        Moshi moshi = new Moshi.Builder().build();
        Type mapObject = Types.newParameterizedType(Map.class, String.class, Object.class);
        JsonAdapter<Map<String, Object>> mapAdapter = moshi.adapter(mapObject);
        Map<String, Object> responseMap = new HashMap<>();
        String size = request.queryParams("size");
        if (size == null || !size.equals("full")) {
            responseMap.put("players", datasource.getPlayers());
        } else {
            responseMap.put("data", datasource.getMap());
        }
        responseMap.put("result", "success");
        return mapAdapter.toJson(responseMap);
    }
}
