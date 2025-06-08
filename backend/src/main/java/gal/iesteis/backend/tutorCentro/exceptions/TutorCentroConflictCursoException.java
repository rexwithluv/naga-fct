package gal.iesteis.backend.tutorCentro.exceptions;

public class TutorCentroConflictCursoException extends RuntimeException {
    public TutorCentroConflictCursoException() {
        super("Este curso ya está asignado a un tutor.");
    }
}
