package gal.iesteis.backend.skill.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SkillDTOResponse extends SkillDTO {
    private Integer id;
    private String nombre;
    private Byte especialidadId;
}
