package gal.iesteis.backend.especialidad;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gal.iesteis.backend.especialidad.exception.EspecialidadNotFoundException;

@Service
public class EspecialidadService {

  @Autowired
  private EspecialidadRepository repository;

  public List<Especialidad> getAll() {
    return repository.findAll();
  }

  public Especialidad getById(Byte id) {
    return repository.findById(id).orElseThrow(() -> new EspecialidadNotFoundException(id));
  }

}
