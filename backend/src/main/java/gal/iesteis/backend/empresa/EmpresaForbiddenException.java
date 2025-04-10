package gal.iesteis.backend.empresa;


public class EmpresaForbiddenException extends RuntimeException {
    public EmpresaForbiddenException(Long id) {
        super("No tienes permiso para consultar la información de la empresa " + id);
    }
}
