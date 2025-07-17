package gal.iesteis.backend.tutorCentro.exceptions;

public class TutorCentroConflictInactivoException extends RuntimeException {
  public TutorCentroConflictInactivoException() {
    super("Este tutor de centro ya está inactivo. Cambia su estado si corresponde.");
  }
}
