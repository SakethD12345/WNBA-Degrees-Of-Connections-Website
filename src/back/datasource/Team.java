package src.back.datasource;

import java.util.ArrayList;
import java.util.List;

public record Team(String name, List<String> roster) {
    public boolean hasPlayer(String player) {
        for (String item: roster) {
            if (player.equals(item)) {
                return true;
            }
        }
        return false;
    }
}
