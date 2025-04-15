package gal.iesteis.backend.skill;

public class SkillNotFoundException extends RuntimeException {
    public SkillNotFoundException(Integer id) {
        super("No se ha encontrado una skill con el id " + id);
    }
}
