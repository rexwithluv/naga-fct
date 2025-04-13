package gal.iesteis.backend.concello;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConcelloRepository extends JpaRepository<Concello, Integer> {
    Concello findByNombre(String nombre);
}
