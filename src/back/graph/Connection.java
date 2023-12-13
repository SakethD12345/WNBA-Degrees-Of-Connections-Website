package src.back.graph;

/**
 * This is the Connection class. It is used to connect a teams name to the year
 * it is played.
 *
 * @param team team name
 * @param year team year
 */
public record Connection(String team, String year) {

    //methods used for testing
    public void print() {
        System.out.println("Connection- Team: " + team);
        System.out.println("Connection- Year: " + year);
    }
    @Override
    public String toString() {
        return "team = " + team + ", year = " + year;
    }
}
