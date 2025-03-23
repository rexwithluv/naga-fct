package gal.iesteis.backend.alumno;


public class AlumnoNotFoundException extends RuntimeException {
    public AlumnoNotFoundException(Long id) {
        super("Alumno con el id " + id + " no encontrado.");
    }
}
