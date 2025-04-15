package gal.iesteis.backend.alumno;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gal.iesteis.backend.alumno.dto.AlumnoDTO;
import gal.iesteis.backend.alumno.dto.AlumnoDTOCreate;
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
                .map(alumno -> isAdmin ? dtoConverter.alumnoADTOResponseAdmin(alumno)
                        : dtoConverter.alumnoADTOResponse(alumno))
                .toList();
    }

    public AlumnoDTO obtenerPorId(UserDetailsImpl userDetails, Long id) {
        Alumno alumno = repository.findById(id).orElseThrow(() -> new AlumnoNotFoundException(id));

        boolean isAdmin = AuthUtils.isAdmin(userDetails);
        if (isAdmin) {
            return dtoConverter.alumnoADTOResponseAdmin(alumno);
        }

        boolean esTutorAlumno = alumno.getTutorCentro().getId().equals(userDetails.getTutorCentroId());
        if (esTutorAlumno) {
            return dtoConverter.alumnoADTOResponse(alumno);
        }
        
        throw new AlumnoForbiddenException(id);
    }

    public AlumnoDTO crearAlumno(UserDetailsImpl userDetails, AlumnoDTOCreate dto) {
        Alumno nuevoAlumno = repository.save(dtoConverter.DTOCreateAAlumno(dto, userDetails));

        return AuthUtils.isAdmin(userDetails) ? dtoConverter.alumnoADTOResponseAdmin(nuevoAlumno)
                : dtoConverter.alumnoADTOResponse(nuevoAlumno);
    }
}
