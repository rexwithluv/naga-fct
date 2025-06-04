package gal.iesteis.backend.fct.exceptions;

public class FCTNotFoundException extends RuntimeException {
  public FCTNotFoundException(Long id) {
    super("FCT con el id " + id + " no encontrada.");
  }
}
