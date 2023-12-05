package src.back.datasource;

import src.back.graph.Edge;

import java.util.ArrayList;

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

}
