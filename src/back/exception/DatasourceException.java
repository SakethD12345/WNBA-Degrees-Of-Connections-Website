package src.back.exception;

/**
 * This class throws an exception when there is an error in the data source
 */
public class DatasourceException extends Exception {


    public DatasourceException(String message) {
        super(message);
    }

}
