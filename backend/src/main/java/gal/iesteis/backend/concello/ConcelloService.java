package gal.iesteis.backend.concello;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class ConcelloService {

    @Autowired
    private ConcelloRepository repository;

    public List<Concello> obtenerConcellos(Optional<String> nombre) {
        if (nombre.isEmpty()) {
            return repository.findAll();
        }
        return repository.findByNombreStartingWith(nombre.get());
    }

    public Concello obtenerPorId(Integer id) {
        return repository.findById(id).orElseThrow(() -> new ConcelloNotFoundException(id));
    }
}
