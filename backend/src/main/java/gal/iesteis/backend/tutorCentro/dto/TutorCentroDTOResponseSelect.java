package gal.iesteis.backend.tutorCentro.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TutorCentroDTOResponseSelect extends TutorCentroDTO {
    private Long id;
    private String nombreCompletoCurso;
}
