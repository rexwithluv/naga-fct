package gal.iesteis.backend.tutorEmpresa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorEmpresaRepository extends JpaRepository<TutorEmpresa, Long> {
}
