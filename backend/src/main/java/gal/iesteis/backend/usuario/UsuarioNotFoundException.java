package gal.iesteis.backend.usuario;

public class UsuarioNotFoundException extends RuntimeException {
  public UsuarioNotFoundException(Long id) {
    super("Usuario con el id " + id + " no encontrado.");
  }
}
