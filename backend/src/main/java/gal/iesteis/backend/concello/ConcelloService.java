package gal.iesteis.backend.concello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConcelloService {

    @Autowired
    private ConcelloRepository repository;

    public Concello obtenerPorId(Integer id) {
        return repository.findById(id).orElseThrow(() -> new ConcelloNotFoundException(id));
    }
}
