package gal.iesteis.backend.alumno;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.usuario.UsuarioService;

@Service
public class AlumnoService {

    @Autowired
    private AlumnoRepository repository;

    @Autowired
    private UsuarioService usuarioService;

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
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(rol -> rol.getAuthority().equals("ROLE_1"));
        List<Alumno> alumnos = new ArrayList<>();

        // Si es admin, devolvemos todos
        if (isAdmin) {
            alumnos = repository.findAll();
        }

        // Si es profesor, solo los que le pertenecen y están activos
        if (!isAdmin) {
            Long tutorId = userDetails.getTutorCentroId();
            alumnos = repository.findByTutorCentroIdAndEstadoId(tutorId, (byte) 1);
        }

        return alumnos.stream().map(alumno -> alumnoADTO(alumno)).toList();
    }

    public AlumnoDTO obtenerPorId(Long id) {
        Alumno alumno = repository.findById(id).orElseThrow(() -> new AlumnoNotFoundException(id));
        return alumnoADTO(alumno);
    }
}
