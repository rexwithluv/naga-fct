package gal.iesteis.backend.alumno;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlumnoService {

    @Autowired
    private AlumnoRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    private AlumnoDTO alumnoADTO(Alumno alumno) {
        AlumnoDTO dto = modelMapper.map(alumno, AlumnoDTO.class);

        dto.setConcello(alumno.getConcello().getNombre());
        dto.setEstado(alumno.getEstado().getNombre());
        dto.setTutorCentro(alumno.getTutorCentro().getNombre() + " " + alumno.getTutorCentro().getApellidos());

        return dto;
    }

    public List<AlumnoDTO> obtenerTodos() {
        List<Alumno> alumnos = repository.findAll();
        return alumnos.stream().map(alumno -> alumnoADTO(alumno)).toList();
    }

    public AlumnoDTO obtenerPorId(Long id) {
        Alumno alumno = repository.findById(id).orElseThrow(() -> new AlumnoNotFoundException(id));
        return alumnoADTO(alumno);
    }
}
