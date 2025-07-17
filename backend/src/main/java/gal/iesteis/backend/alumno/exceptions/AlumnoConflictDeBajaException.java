package gal.iesteis.backend.alumno.exceptions;

public class AlumnoConflictDeBajaException extends RuntimeException {
  public AlumnoConflictDeBajaException() {
    super("Este alumno ya está de baja. Cambia antes su estado si corresponde.");
  }
}
