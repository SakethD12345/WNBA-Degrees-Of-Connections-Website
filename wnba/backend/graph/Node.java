package wnba.backend.graph;

import java.util.ArrayList;

public record Node(String fullName, ArrayList<Edge> edges) {
    public boolean equals(Node player) {
        return fullName.equals(player.fullName());
    }
    public void addEdge(Edge edge) {
        edges.add(edge);
    }
}

