package gal.iesteis.backend.usuario.exceptions;

public class UsuarioConflictException extends RuntimeException {
    public UsuarioConflictException() {
        super("Este tutor ya tiene un usuario asignado.");
    }
}
