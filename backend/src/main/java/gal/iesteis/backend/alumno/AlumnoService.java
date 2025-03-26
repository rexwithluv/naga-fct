package gal.iesteis.backend.alumno;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlumnoService {

    @Autowired
    private AlumnoRepository repository;

    public List<Alumno> obtenerTodos() {
        return repository.findAll();
    }

    public Alumno obtenerPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new AlumnoNotFoundException(id));
    }
}
