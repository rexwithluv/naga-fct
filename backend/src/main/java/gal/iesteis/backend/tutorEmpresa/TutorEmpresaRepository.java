package gal.iesteis.backend.tutorEmpresa;

import gal.iesteis.backend.empresa.Empresa;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorEmpresaRepository extends JpaRepository<TutorEmpresa, Long> {
  List<TutorEmpresa> findByEmpresa(Empresa empresa);
}
