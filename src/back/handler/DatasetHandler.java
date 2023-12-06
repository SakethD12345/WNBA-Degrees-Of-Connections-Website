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
import java.util.stream.Stream;

public class DatasetHandler implements Route {
    private Datasource datasource;

    /**
     * The constructor builds a broadband handler with a cache and the datasource
     * @param datasource is the data source
     */
    public DatasetHandler(Datasource datasource) {
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
