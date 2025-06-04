package gal.iesteis.backend.fct.exceptions;

public class FCTForbiddenCreateException extends RuntimeException {
  public FCTForbiddenCreateException() {
    super(
        "No tienes permiso para crear esta FCT. Asegúrate de que el alumno es tuyo y la empresa pertenece a tu especialidad.");
  }
}
