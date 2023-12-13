package src.back.datasource;

import java.util.List;

/**
 * This is the Team record. It is a lightweight class that stores the team name
 * and a list of Strings representing the player on each roster
 * @param name team name
 * @param roster list of strings representing the roster
 */
public record Team(String name, List<String> roster) {
}
