package gal.iesteis.backend.empresa;

public class EmpresaNotFoundException extends RuntimeException {
  public EmpresaNotFoundException(Long id) {
    super("Empresa con el id " + id + " no encontrada.");
  }
}
