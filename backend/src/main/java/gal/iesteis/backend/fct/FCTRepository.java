package gal.iesteis.backend.fct;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FCTRepository extends JpaRepository<FCT, Long> {

}
