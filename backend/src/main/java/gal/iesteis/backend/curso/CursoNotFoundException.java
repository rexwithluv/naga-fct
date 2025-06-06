package gal.iesteis.backend.curso;

public class CursoNotFoundException extends RuntimeException {
    public CursoNotFoundException(Short id) {
        super("Curso con el id " + id + " no encontrado.");
    }
}
