package gal.iesteis.backend.estadoAlumno;

public class EstadoAlumnoNotFoundException extends RuntimeException {
    public EstadoAlumnoNotFoundException(Byte id) {
        super("No se ha encontrado el estado de alumno con el id " + id);
    }
}
