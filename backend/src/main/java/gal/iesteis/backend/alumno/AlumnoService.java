package gal.iesteis.backend.alumno;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;

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

    public List<AlumnoDTO> obtenerTodos(UserDetailsImpl userDetails) {
        boolean isAdmin = AuthUtils.isAdmin(userDetails);
        List<Alumno> alumnos = new ArrayList<>();

        // Si es admin, devolvemos todos
        if (isAdmin) {
            alumnos = repository.findAll();
        } else {
            Long tutorId = userDetails.getTutorCentroId();
            alumnos = repository.findByTutorCentroIdAndEstadoId(tutorId, (byte) 1);
        }

        return alumnos.stream().map(alumno -> alumnoADTO(alumno)).toList();
    }

    public AlumnoDTO obtenerPorId(UserDetailsImpl userDetails, Long id) {
        Alumno alumno = repository.findById(id).orElseThrow(() -> new AlumnoNotFoundException(id));

        // Comprobamos que el alumno que busca también aparece su "todo", así
        // centralizmos el control de acceso a los alumnos.
        // Si el día de mañana decidimos cambiar algún parámetro (por ejemplo que se
        // muestren solo los activos o en cambio, todos) podemos controlarlo solo en
        // obtenerTodos()
        List<AlumnoDTO> alumnos = obtenerTodos(userDetails);

        boolean alumnoEnAlumnos = alumnos.stream().anyMatch(a -> a.getId().equals(alumno.getId()));
        boolean isAdmin = AuthUtils.isAdmin(userDetails);

        if (!isAdmin && !alumnoEnAlumnos) {
            throw new AlumnoForbiddenException(id);
        }
        return alumnoADTO(alumno);
    }
}
