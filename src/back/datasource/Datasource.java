package src.back.datasource;

import com.google.common.cache.Cache;
import src.back.exception.DatasourceException;
import src.back.graph.Edge;
import src.back.graph.Node;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * This is the interface that defines a Datasource and allows for mocking
 */
public interface Datasource {
    public ArrayList<Edge> getConnection(Node player1, Node player2);
}
