package src.back.graph;

import java.util.HashMap;

/**
 * This is the edge class. It is a lightweight record class that is used to represent
 * the connection between two players when they were teammates at some point.
 *
 * @param player1 first player in the connection
 * @param player2 second player in the connection
 * @param connection record that describes the year and team they played for
 */
public record Edge(String player1, String player2, Connection connection) {

    //used for testing purposes
    public void print() {
        System.out.println("Edge- Player 1: " + player1);
        System.out.println("Edge- Player 2: " + player2);
        connection.print();
    }

    //gets player on the other end of a connection, given that player
    public String getOppositePlayer(String player) {
        if (player.equals(player1)) {
            return player2;
        } return player1;
    }

    //converts given information into a map for using information
    public HashMap<String, String> toMap() {
        HashMap<String, String> map = new HashMap<>();
        map.put("Player 1", player1);
        map.put("Player 2", player2);
        map.put("Team", connection.team());
        map.put("Season", connection.year());
        return map;
    }

    //used for testing
    @Override
    public String toString() {
        return (player1 + " -> " + player2 + ", team = " + connection.team() + ", year = " + connection.year());

    }



}

