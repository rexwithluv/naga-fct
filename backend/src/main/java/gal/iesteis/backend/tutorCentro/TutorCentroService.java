package gal.iesteis.backend.tutorCentro;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TutorCentroService {

    @Autowired
    private TutorCentroRepository repository;

    public List<TutorCentro> obtenerTodos() {
        return repository.findAll();
    }

    public TutorCentro obtenerPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new TutorCentroNotFoundException(id));
    }
}
