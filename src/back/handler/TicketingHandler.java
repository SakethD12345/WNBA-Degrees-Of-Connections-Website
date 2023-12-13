package src.back.handler;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import spark.Request;
import spark.Response;
import spark.Route;
import src.back.datasource.Datasource;
import src.back.exception.DatasourceException;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

/**
 * This is the TicketingHandler class. It implements the route method. It is responsible
 * for defining the endpoint where ticketing information is grabbed on the front end.
 */
public class TicketingHandler implements Route {
    private Datasource datasource;

    /**
     * Constructor takes in datasource object as parameter
     */
    public TicketingHandler(Datasource datasource) {
        this.datasource = datasource;
    }

    /**
     * This is the handle method. It is defined from the Route interface. Takes in a request
     * for information and returns a JSON with the necessary information.
     * @param request requested information
     * @param response n/a for this application
     * @return JSON object with ticketing information based on the team
     */
    public Object handle(Request request, Response response) {
        Moshi moshi = new Moshi.Builder().build();
        Type mapObject = Types.newParameterizedType(Map.class, String.class, Object.class);
        JsonAdapter<Map<String, Object>> mapAdapter = moshi.adapter(mapObject);
        Map<String, Object> responseMap = new HashMap<>();
        String team = request.queryParams("team");
        try {
            responseMap.put("ticketing", datasource.getTicketing(team));
            responseMap.put("result", "success");
        } catch (DatasourceException e) {
            responseMap.put("result", "error");
            responseMap.put("error", e.getMessage());
        }
        return mapAdapter.toJson(responseMap);
    }
}

