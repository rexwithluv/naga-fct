package gal.iesteis.backend.rolUsuario;

public class RolUsuarioNotFoundException extends RuntimeException {
    public RolUsuarioNotFoundException(Byte id) {
        super("Rol de usuario con el id " + id + " no encontrado.");
    }
}
