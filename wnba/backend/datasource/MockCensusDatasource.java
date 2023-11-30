package wnba.backend.datasource;

import com.google.common.cache.Cache;
import wnba.backend.graph.Edge;
import wnba.backend.graph.Node;

import java.lang.reflect.Array;
import java.util.ArrayList;

/**
 * This is the MockCensusDatasource class. It is used in testing and does not access
 * our backend server.
 */
public class MockCensusDatasource implements Datasource {

    public MockCensusDatasource() {

    }
    public ArrayList<Edge> getConnection(Node player1, Node player2) {
        return null;
    }

}
