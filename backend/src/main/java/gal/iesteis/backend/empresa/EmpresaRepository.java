package gal.iesteis.backend.empresa;

import gal.iesteis.backend.especialidad.Especialidad;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
  List<Empresa> findByEspecialidad(Especialidad especialidad);
}
