package src.back.test;


import org.junit.jupiter.api.Test;
import src.back.datasource.APIDatasource;
import src.back.exception.DatasourceException;
import src.back.graph.Edge;

import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class TestAPIDatasource {

    @Test
    public void testConnections() throws DatasourceException {
        APIDatasource datasource = new APIDatasource();
        ArrayList<Edge> connection = datasource.getConnection("Candace Parker", "Sue Bird");
        assertEquals(connection.size(), 2);
    }

    @Test
    public void testRandomInput() throws DatasourceException {
        APIDatasource datasource = new APIDatasource();
        Object[] playerList = datasource.getPlayers().toArray();
        for (int i = 0; i < 100; i++) {
            int randInt = (int) (Math.random() * playerList.length);
            int randInt2 = (int) (Math.random() * playerList.length);
            ArrayList<Edge> connection = datasource.getConnection(playerList[randInt].toString(),
                    playerList[randInt2].toString());
            assertNotEquals(connection.size(), 0);
        }
    }

    @Test
    public void testInvalidInput() throws DatasourceException {
        APIDatasource datasource = new APIDatasource();
        assertThrows(DatasourceException.class, () -> datasource.getConnection("sfkhsf", "ksfhskf"));
        assertThrows(DatasourceException.class, () -> datasource.getConnection("Sue Bird", "Sue Bird"));
    }

}
