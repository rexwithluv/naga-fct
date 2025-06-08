package gal.iesteis.backend.rolUsuario;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolUsuarioService {

    @Autowired
    private RolUsuarioRepository repository;

    public List<RolUsuario> obtenerTodos() {
        return repository.findAll();
    }

    public RolUsuario obtenerRolUsuarioPorId(Byte id) {
        return repository.findById(id).orElseThrow(() -> new RolUsuarioNotFoundException(id));
    }
}
