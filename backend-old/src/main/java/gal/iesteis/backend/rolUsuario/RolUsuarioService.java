package gal.iesteis.backend.rolUsuario;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gal.iesteis.backend.rolUsuario.exception.RolUsuarioNotFoundException;

@Service
public class RolUsuarioService {

  @Autowired private RolUsuarioRepository repository;

  public List<RolUsuario> getAll() {
    return repository.findAll();
  }

  public RolUsuario getRolUsuarioById(Byte id) {
    return repository.findById(id).orElseThrow(() -> new RolUsuarioNotFoundException(id));
  }
}
