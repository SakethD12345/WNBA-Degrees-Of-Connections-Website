package wnba.backend.graph;

public record Connection(String team, String year) {
    public void print() {
        System.out.println("Connection- Team: " + team);
        System.out.println("Connection- Year: " + year);
    }
}
