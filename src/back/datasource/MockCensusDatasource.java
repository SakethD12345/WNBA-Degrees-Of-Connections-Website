package src.back.datasource;

import com.google.common.cache.Cache;
import src.back.graph.Edge;
import src.back.graph.Node;

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
