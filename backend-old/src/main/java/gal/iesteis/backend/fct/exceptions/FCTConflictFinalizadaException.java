package gal.iesteis.backend.fct.exceptions;

public class FCTConflictFinalizadaException extends RuntimeException {
  public FCTConflictFinalizadaException() {
    super("Esta FCT ya está finalizada.");
  }
}
