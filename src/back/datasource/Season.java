package src.back.datasource;

import java.util.List;

/**
 * This is the Season record. It is a lightweight class that stores information
 * on what year the season was and the list of teams in it.
 * @param season string representing year of the league
 * @param teams list of team objects representing each team
 */
public record Season (String season, List<Team> teams){
}
