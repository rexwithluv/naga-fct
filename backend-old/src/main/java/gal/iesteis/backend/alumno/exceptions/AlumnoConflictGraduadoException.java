package gal.iesteis.backend.alumno.exceptions;

public class AlumnoConflictGraduadoException extends RuntimeException {
  public AlumnoConflictGraduadoException() {
    super(
        "Este alumno está graduado, no puedes darlo de baja. Cambia antes su estado si"
            + " corresponde.");
  }
}
