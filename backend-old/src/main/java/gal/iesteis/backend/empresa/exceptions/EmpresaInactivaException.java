package gal.iesteis.backend.empresa.exceptions;

public class EmpresaInactivaException extends RuntimeException {
  public EmpresaInactivaException() {
    super("Esta empresa ya está inactiva. Cambia antes su estado si corresponde.");
  }
}
