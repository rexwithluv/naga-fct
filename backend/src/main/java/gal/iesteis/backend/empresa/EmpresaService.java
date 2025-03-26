package gal.iesteis.backend.empresa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository repository;

    public List<Empresa> obtenerTodas() {
        return repository.findAll();
    }

    public Empresa obtenerPorId(Long id){
        return repository.findById(id).orElseThrow(() -> new EmpresaNotFoundException(id));
    }
}
