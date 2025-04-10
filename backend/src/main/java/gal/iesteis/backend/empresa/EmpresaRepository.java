package gal.iesteis.backend.empresa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import gal.iesteis.backend.especialidad.Especialidad;
import java.util.List;


@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    List<Empresa> findByEspecialidad(Especialidad especialidad);
}
