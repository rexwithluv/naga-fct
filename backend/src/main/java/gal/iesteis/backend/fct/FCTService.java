package gal.iesteis.backend.fct;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FCTService {

    @Autowired
    private FCTRepository repository;

    public List<FCT> obtenerTodas() {
        return repository.findAll();
    }

    public FCT obtenerPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new FCTNotFoundExcpetion(id));
    }
}
