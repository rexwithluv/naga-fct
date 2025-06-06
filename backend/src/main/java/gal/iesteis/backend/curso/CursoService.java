package gal.iesteis.backend.curso;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CursoService {

    @Autowired
    private CursoRepository repository;

    public Curso obtenerCursoPorId(Short id) {
        return repository.findById(id).orElseThrow(() -> new CursoNotFoundException(id));
    }
}
