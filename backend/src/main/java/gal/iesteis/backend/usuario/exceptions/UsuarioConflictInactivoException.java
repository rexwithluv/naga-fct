package gal.iesteis.backend.usuario.exceptions;

public class UsuarioConflictInactivoException extends RuntimeException {
  public UsuarioConflictInactivoException() {
    super("Este usuario ya está inactivo. Cambia su estado si corresponde.");
  }
}
