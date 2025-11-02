package gal.iesteis.backend.tutorCentro.exceptions;

public class TutorCentroNotFoundException extends RuntimeException {
  public TutorCentroNotFoundException(Long id) {
    super("Tutor con el id " + id + " no encontrado.");
  }
}
