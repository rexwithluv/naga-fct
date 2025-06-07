package gal.iesteis.backend.tutorEmpresa.exceptions;

public class TutorEmpresaForbiddenCreateException extends RuntimeException {
  public TutorEmpresaForbiddenCreateException() {
    super(
        "No tienes permiso para crear este tutor de empresa. Asegúrate de que la empresa que has asignado es de tu especialidad.");
  }
}
