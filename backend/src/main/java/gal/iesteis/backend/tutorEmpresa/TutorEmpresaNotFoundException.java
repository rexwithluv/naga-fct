package gal.iesteis.backend.tutorEmpresa;

public class TutorEmpresaNotFoundException extends RuntimeException {
    public TutorEmpresaNotFoundException(Long id) {
        super("Tutor con el id " + id + " no encontrado.");
    }
}
