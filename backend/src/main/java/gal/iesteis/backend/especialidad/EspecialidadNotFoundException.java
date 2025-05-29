package gal.iesteis.backend.especialidad;

public class EspecialidadNotFoundException extends RuntimeException {
  public EspecialidadNotFoundException(Byte id) {
    super("No se ha encontrado la especialidad con el id " + id);
  }
}
