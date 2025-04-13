package gal.iesteis.backend.estadoAlumno;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoAlumnoService {

    @Autowired
    private EstadoAlumnoRepository repository;

    public EstadoAlumno obtenerPorNombre(String nombre){
        return repository.findByNombre(nombre);
    }
}
