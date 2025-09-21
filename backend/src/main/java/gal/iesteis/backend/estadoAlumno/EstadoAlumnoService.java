package gal.iesteis.backend.estadoAlumno;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gal.iesteis.backend.estadoAlumno.exception.EstadoAlumnoNotFoundException;

@Service
public class EstadoAlumnoService {

  @Autowired private EstadoAlumnoRepository repository;

  public List<EstadoAlumno> getAll() {
    return repository.findAll();
  }

  public EstadoAlumno getById(Byte id) {
    return repository.findById(id).orElseThrow(() -> new EstadoAlumnoNotFoundException(id));
  }

  public EstadoAlumno getByNombre(String nombre) {
    return repository
        .findByNombre(nombre)
        .orElseThrow(() -> new EstadoAlumnoNotFoundException(nombre));
  }
}
