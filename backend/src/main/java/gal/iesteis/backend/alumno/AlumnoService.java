package gal.iesteis.backend.alumno;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gal.iesteis.backend.alumno.dto.AlumnoDTO;
import gal.iesteis.backend.alumno.dto.AlumnoDTOCreate;
import gal.iesteis.backend.alumno.exceptions.AlumnoForbiddenException;
import gal.iesteis.backend.alumno.exceptions.AlumnoNotFoundException;
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
    List<Alumno> alumnos = isAdmin
        ? repository.findAll()
        : repository.findByTutorCentroId(userDetails.getTutorCentroId());

    return alumnos.stream()
        .map(alumno -> dtoConverter.alumnoADTOResponse(alumno, isAdmin))
        .toList();
  }

  public Alumno obtenerAlumnoPorId(Long id) {
    return repository.findById(id).orElseThrow(() -> new AlumnoNotFoundException(id));
  }

  public AlumnoDTO obtenerPorId(UserDetailsImpl userDetails, Long id) {
    Alumno alumno = obtenerAlumnoPorId(id);

    boolean isAdmin = AuthUtils.isAdmin(userDetails);
    boolean esTutorAlumno = alumno.getTutorCentro().getId().equals(userDetails.getTutorCentroId());
    if (!isAdmin && !esTutorAlumno) {
      throw new AlumnoForbiddenException(id);
    }

    return dtoConverter.alumnoADTOResponse(alumno, isAdmin);
  }

  public AlumnoDTO crearAlumno(UserDetailsImpl userDetails, AlumnoDTOCreate dto) {
    Alumno nuevoAlumno = repository.save(dtoConverter.DTOCreateAAlumno(dto, userDetails));

    return dtoConverter.alumnoADTOResponse(nuevoAlumno, AuthUtils.isAdmin(userDetails));
  }
}
