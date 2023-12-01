package wnba.backend.datasource;

import java.util.ArrayList;

public record Team(String name, ArrayList<String> roster) {
    public boolean hasPlayer(String player) {
        for (String item: roster) {
            if (player.equals(item)) {
                return true;
            }
        }
        return false;
    }
}
