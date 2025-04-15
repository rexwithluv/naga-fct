package gal.iesteis.backend.alumno.exceptions;


public class AlumnoForbiddenException extends RuntimeException {
    public AlumnoForbiddenException(Long id) {
        super("No tienes permiso para consultar la información del alumno " + id);
    }
}
