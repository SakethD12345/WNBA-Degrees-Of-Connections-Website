package src.back.graph;

import java.util.ArrayList;

public record Edge(Node player1, Node player2, Connection connection) {

    public boolean containsPlayer(Node player) {
        return (player.equals(player1) || player.equals(player2));
    }
    public void print() {
        System.out.println("Edge- Player 1: " + player1.fullName());
        System.out.println("Edge- Player 2: " + player2.fullName());
        connection.print();
    }

}

