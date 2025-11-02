package gal.iesteis.backend.usuario;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
  Usuario findByEmail(String email);

  Boolean existsByEmail(String email);

  List<Usuario> findByTutorCentroIsNull();

  List<Usuario> findByTutorCentroIsNotNull();
}
