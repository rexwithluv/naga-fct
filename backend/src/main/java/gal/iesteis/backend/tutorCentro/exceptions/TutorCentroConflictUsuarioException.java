package gal.iesteis.backend.tutorCentro.exceptions;

public class TutorCentroConflictUsuarioException extends RuntimeException {
    public TutorCentroConflictUsuarioException() {
        super("Este usuario ya tiene un tutor asignado.");
    }
}
