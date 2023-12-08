package src.back.datasource;

import src.back.graph.Edge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;
import java.util.stream.Stream;

/**
 * This is the MockCensusDatasource class. It is used in testing and does not access
 * our backend server.
 */
public class MockCensusDatasource implements Datasource {

    public MockCensusDatasource() {

    }
    public ArrayList<Edge> getConnection(String playerName1, String playerName2) {
        return null;
    }
    public Set<String> getPlayers() {return null;};
    public HashMap<String, ArrayList<Edge>> getMap() {return null;};

}
