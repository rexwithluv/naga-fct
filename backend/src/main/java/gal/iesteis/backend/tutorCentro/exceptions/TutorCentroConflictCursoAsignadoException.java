package gal.iesteis.backend.tutorCentro.exceptions;

public class TutorCentroConflictCursoAsignadoException extends RuntimeException {
  public TutorCentroConflictCursoAsignadoException() {
    super("Este curso ya está asignado a un tutor.");
  }
}
