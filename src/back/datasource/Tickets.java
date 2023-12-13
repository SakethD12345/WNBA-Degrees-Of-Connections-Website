package src.back.datasource;

import java.util.HashMap;
import java.util.Map;

/**
 * This is the Tickets record. It is a lightweight java class that is used for
 * holding team names to the tickets
 * @param ticketing map holding team names to tickets
 */
public record Tickets(Map<String, String> ticketing) {
}
