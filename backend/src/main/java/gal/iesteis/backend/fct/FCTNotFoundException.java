package gal.iesteis.backend.fct;

public class FCTNotFoundException extends RuntimeException {
    public FCTNotFoundException(Long id) {
        super("FCT con el id " + id + " no encontrada.");
    }
}

