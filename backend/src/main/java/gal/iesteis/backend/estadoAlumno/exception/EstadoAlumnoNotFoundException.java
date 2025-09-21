package gal.iesteis.backend.estadoAlumno.exception;

public class EstadoAlumnoNotFoundException extends RuntimeException {
  public EstadoAlumnoNotFoundException(String nombre) {
    super("No se ha encontrado el estado de alumno con el nombre " + nombre + ".");
  }

  public EstadoAlumnoNotFoundException(Byte id) {
    super("No se ha encontrado el estado de alumno con el id " + id);
  }
}
