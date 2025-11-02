package gal.iesteis.backend.usuario.exceptions;

public class UsuarioForbiddenException extends RuntimeException {
  public UsuarioForbiddenException() {
    super("No tienes permiso para consultar información acerca de los usuarios de la aplicación.");
  }
}
