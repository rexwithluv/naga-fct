package gal.iesteis.backend.tutorCentro.exceptions;

public class TutorCentroConflictCursoException extends RuntimeException {
  public TutorCentroConflictCursoException() {
    super(
        "Este tutor no puede ser eliminado porque está tutorizando un curso. Asigna el curso a otro"
            + " tutor si corresponde.");
  }
}
