package gal.iesteis.backend.skill;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import gal.iesteis.backend.especialidad.Especialidad;
import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Integer> {
    List<Skill> findByEspecialidad(Especialidad especialidad);
}
