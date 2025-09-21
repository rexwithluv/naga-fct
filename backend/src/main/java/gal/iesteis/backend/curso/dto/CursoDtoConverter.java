package gal.iesteis.backend.curso.dto;

import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gal.iesteis.backend.curso.Curso;
import gal.iesteis.backend.especialidad.Especialidad;
import gal.iesteis.backend.tutorCentro.TutorCentro;

@Component
public class CursoDtoConverter {
    @Autowired
    private ModelMapper modelMapper;

    public CursoDtoGetAdmin cursoToDtoGetAdmin(Curso curso) {
        CursoDtoGetAdmin dto = modelMapper.map(curso, CursoDtoGetAdmin.class);

        Especialidad especialidad = curso.getEspecialidad();
        dto.setEspecialidad(Map.of(
                "id", especialidad.getId(),
                "nombre", especialidad.getNombre()));

        TutorCentro tutorCentro = curso.getTutorCentro();
        if (tutorCentro != null) {
            dto.setTutorCentro(Map.of(
                    "id", tutorCentro.getId(),
                    "nombre", tutorCentro.getNombre(),
                    "apellidos", tutorCentro.getApellidos()));
        }

        return dto;
    }
}
