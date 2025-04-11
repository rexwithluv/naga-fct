package gal.iesteis.backend.fct;

public class FCTForbiddenException extends RuntimeException {
    public FCTForbiddenException(Long id) {
        super("No tienes permiso para consultar la información de la FCT " + id);
    }
}
