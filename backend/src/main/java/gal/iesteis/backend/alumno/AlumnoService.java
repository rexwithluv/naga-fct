package gal.iesteis.backend.alumno;

import gal.iesteis.backend.alumno.dto.AlumnoDTO;
import gal.iesteis.backend.alumno.dto.AlumnoDTOCreate;
import gal.iesteis.backend.alumno.exceptions.AlumnoConflictGraduadoException;
import gal.iesteis.backend.alumno.exceptions.AlumnoForbiddenException;
import gal.iesteis.backend.alumno.exceptions.AlumnoNotFoundException;
import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.estadoAlumno.EstadoAlumno;
import gal.iesteis.backend.estadoAlumno.EstadoAlumnoService;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlumnoService {

  @Autowired private AlumnoRepository repository;

  @Autowired private EstadoAlumnoService estadoAlumnoService;

  @Autowired private AlumnoDTOConverter dtoConverter;

  private boolean isAlumnoEstadoGraduado(Alumno alumno) {
    EstadoAlumno graduado = estadoAlumnoService.getByNombre("Graduado");
    if (alumno.getEstado().equals(graduado)) {
      return true;
    }
    return false;
  }

  public List<AlumnoDTO> obtenerTodos(UserDetailsImpl userDetails) {
    boolean isAdmin = AuthUtils.isAdmin(userDetails);

    // Si es admin, devolvemos todos, sino solo los del tutor correspondiente
    List<Alumno> alumnos =
        isAdmin
            ? repository.findAll()
            : repository.findByTutorCentroId(userDetails.getTutorCentroId());

    return alumnos.stream()
        .map(alumno -> dtoConverter.alumnoADTOResponse(alumno, isAdmin))
        .toList();
  }

  public Alumno obtenerAlumnoPorId(UserDetailsImpl userDetails, Long id) {
    Alumno alumno = repository.findById(id).orElseThrow(() -> new AlumnoNotFoundException(id));

    boolean isAdmin = AuthUtils.isAdmin(userDetails);
    boolean esTutorAlumno = alumno.getTutorCentro().getId().equals(userDetails.getTutorCentroId());
    if (!isAdmin && !esTutorAlumno) {
      throw new AlumnoForbiddenException(id);
    }

    return alumno;
  }

  public AlumnoDTO obtenerPorId(UserDetailsImpl userDetails, Long id) {
    Alumno alumno = obtenerAlumnoPorId(userDetails, id);
    boolean isAdmin = AuthUtils.isAdmin(userDetails);

    return dtoConverter.alumnoADTOResponse(alumno, isAdmin);
  }

  @Transactional
  public AlumnoDTO crearAlumno(UserDetailsImpl userDetails, AlumnoDTOCreate dto) {
    Alumno nuevoAlumno = repository.save(dtoConverter.DTOCreateAAlumno(dto, userDetails));

    return dtoConverter.alumnoADTOResponse(nuevoAlumno, AuthUtils.isAdmin(userDetails));
  }

  @Transactional
  public void deleteAlumno(UserDetailsImpl userDetails, Long userId) {
    // Comprobamos si existe el alumno y si este usuario tiene permisos
    Alumno alumno = obtenerAlumnoPorId(userDetails, userId);

    // Si el alumno ya está graduado, no podemos darlo de baja
    if (isAlumnoEstadoGraduado(alumno)) {
      throw new AlumnoConflictGraduadoException();
    }

    EstadoAlumno deBaja = estadoAlumnoService.getByNombre("De baja");
    alumno.setEstado(deBaja);

    repository.save(alumno);
  }
}
