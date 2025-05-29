package gal.iesteis.backend.tutorCentro;

public class TutorCentroForbiddenException extends RuntimeException {
  public TutorCentroForbiddenException() {
    super("No tienes permiso para consultar información acerca de los tutores del centro.");
  }
}
