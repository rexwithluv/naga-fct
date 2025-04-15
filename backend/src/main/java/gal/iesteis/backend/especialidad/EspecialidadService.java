package gal.iesteis.backend.especialidad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EspecialidadService {

    @Autowired
    private EspecialidadRepository repository;

    public Especialidad obtenerPorId(Byte id) {
        return repository.findById(id).orElseThrow(() -> new EspecialidadNotFoundException(id));
    }
}
