package gal.iesteis.backend.fct;

public class FCTNotFoundExcpetion extends RuntimeException {
    public FCTNotFoundExcpetion(Long id) {
        super("FCT con el id " + id + " no encontrada.");
    }
}

