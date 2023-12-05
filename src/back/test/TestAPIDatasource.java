package src.back.test;


import org.junit.jupiter.api.Test;
import src.back.datasource.APIDatasource;
import src.back.graph.Edge;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestAPIDatasource {

    @Test
    public void testConnections() {
        APIDatasource datasource = new APIDatasource();
//        ArrayList<Edge> connection = datasource.getConnection("Candace Parker", "Sue Bird");
//        for (Edge edge: connection) {
//            System.out.println("connect: ");
//            System.out.println(edge.player1().fullName());
//            System.out.println(edge.player2().fullName());
//            System.out.println("\n");
//        }
//        assertEquals(connection.size(), 6);
    }

}
