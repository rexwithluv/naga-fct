package gal.iesteis.backend.alumno;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gal.iesteis.backend.alumno.dto.AlumnoDTO;
import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;

@Service
public class AlumnoService {

    @Autowired
    private AlumnoRepository repository;

    @Autowired
    private AlumnoDTOConverter dtoConverter;

    public List<AlumnoDTO> obtenerTodos(UserDetailsImpl userDetails) {
        boolean isAdmin = AuthUtils.isAdmin(userDetails);

        // Si es admin, devolvemos todos, sino solo los del tutor correspondiente
        List<Alumno> alumnos = isAdmin ? repository.findAll()
                : repository.findByTutorCentroId(userDetails.getTutorCentroId());

        return alumnos.stream()
                .map(alumno -> isAdmin ? dtoConverter.alumnoADTOAdmin(alumno) : dtoConverter.alumnoADTOComun(alumno))
                .toList();
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
        return isAdmin ? dtoConverter.alumnoADTOAdmin(alumno) : dtoConverter.alumnoADTOComun(alumno);
    }

    public AlumnoDTO crearAlumno(UserDetailsImpl userDetails, AlumnoDTO alumnoDTO) {
        boolean isAdmin = AuthUtils.isAdmin(userDetails);
        Long tutorCentorId = userDetails.getTutorCentroId();

        Alumno nuevoAlumno = isAdmin ? dtoConverter.DTOAdminAAlumno(alumnoDTO)
                : dtoConverter.DTOComunAAlumno(alumnoDTO, tutorCentorId);
        repository.save(nuevoAlumno);

        return alumnoDTO;
    }
}
