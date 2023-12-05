package src.back.datasource;

import src.back.graph.Edge;

import java.util.ArrayList;

/**
 * This is the interface that defines a Datasource and allows for mocking
 */
public interface Datasource {
    public ArrayList<Edge> getConnection(String playerName1, String playerName2);
}
