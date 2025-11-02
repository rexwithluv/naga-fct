package gal.iesteis.backend.skill;

import gal.iesteis.backend.especialidad.Especialidad;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Integer> {
  List<Skill> findByEspecialidad(Especialidad especialidad);
}
