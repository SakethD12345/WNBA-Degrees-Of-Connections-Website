package wnba.backend.graph;

import java.util.ArrayList;

public record Edge(Node player1, Node player2, ArrayList<Connection> connections) {

    public boolean containsPlayer(Node player) {
        return (player.equals(player1) || player.equals(player2));
    }

}

