package gal.iesteis.backend.concello;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConcelloRepository extends JpaRepository<Concello, Integer> {
    List<Concello> findByNombreStartingWith(String nombre);
}
