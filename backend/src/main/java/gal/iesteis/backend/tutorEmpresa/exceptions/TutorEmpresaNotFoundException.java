package gal.iesteis.backend.tutorEmpresa.exceptions;

public class TutorEmpresaNotFoundException extends RuntimeException {
  public TutorEmpresaNotFoundException(Long id) {
    super("Tutor con el id " + id + " no encontrado.");
  }
}
