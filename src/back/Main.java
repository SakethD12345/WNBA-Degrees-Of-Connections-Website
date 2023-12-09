package src.back;

import src.back.exception.DatasourceException;
import src.back.server.Server;

public final class Main {
    /**
     * The initial method called when execution begins.
     *
     * @param args An array of command line arguments
     */
    public static void main(String[] args) throws DatasourceException {
        new Main(args).run();
    }

    private Main(String[] args) {}

    private void run() throws DatasourceException {
        new Server();
        System.out.println("Server started; exiting main...");
    }
}