package wnba.backend.datasource;

import com.google.common.cache.Cache;
import wnba.backend.exception.DatasourceException;
import wnba.backend.graph.Edge;
import wnba.backend.graph.Node;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * This is the interface that defines a Datasource and allows for mocking
 */
public interface Datasource {
    public ArrayList<Edge> getConnection(Node player1, Node player2);
}
