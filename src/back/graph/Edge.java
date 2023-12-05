package src.back.graph;

import java.util.ArrayList;
import java.util.HashMap;

public record Edge(String player1, String player2, Connection connection) {

    public void print() {
        System.out.println("Edge- Player 1: " + player1);
        System.out.println("Edge- Player 2: " + player2);
        connection.print();
    }
    public String getOppositePlayer(String player) {
        if (player.equals(player1)) {
            return player2;
        } return player1;
    }

    public HashMap<String, String> toMap() {
        HashMap<String, String> map = new HashMap<>();
        map.put("Player 1", player1);
        map.put("Player 2", player2);
        map.put("Team", connection.team());
        map.put("Season", connection.year());
        return map;
    }

    @Override
    public String toString() {
        return (player1 + " -> " + player2 + ", team = " + connection.team() + ", year = " + connection.year());

    }



}

