package gal.iesteis.backend.estadoAlumno;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoAlumnoService {

  @Autowired private EstadoAlumnoRepository repository;

  public List<EstadoAlumno> obtenerTodos() {
    return repository.findAll();
  }

  public EstadoAlumno obtenerPorId(Byte id) {
    return repository.findById(id).orElseThrow(() -> new EstadoAlumnoNotFoundException(id));
  }
}
