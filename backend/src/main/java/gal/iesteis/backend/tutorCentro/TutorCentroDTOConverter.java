package gal.iesteis.backend.tutorCentro;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gal.iesteis.backend.curso.Curso;
import gal.iesteis.backend.curso.CursoService;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTO;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTOCreate;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTOResponseAdmin;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTOResponseSelect;
import gal.iesteis.backend.usuario.Usuario;
import gal.iesteis.backend.usuario.UsuarioService;

@Component
public class TutorCentroDTOConverter {

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private CursoService cursoService;

  @Autowired
  private UsuarioService usuarioService;

  public TutorCentroDTO tutorCentroADtoResponseAdmin(TutorCentro tutor) {
    TutorCentroDTOResponseAdmin dto = modelMapper.map(tutor, TutorCentroDTOResponseAdmin.class);

    dto.setCurso(tutor.getCurso().getNombre());

    return dto;
  }

  public TutorCentroDTO tutorCentroADtoResponseSelect(TutorCentro tutor) {
    TutorCentroDTOResponseSelect dto = modelMapper.map(tutor, TutorCentroDTOResponseSelect.class);

    dto.setNombreCompletoCurso(
        String.format(
            "%s %s - %s", tutor.getNombre(), tutor.getApellidos(), tutor.getCurso().getCodigo()));

    return dto;
  }

  public TutorCentro dtoCreateATutorCentro(TutorCentroDTOCreate dto) {
    // Existe un problema con modelMapper en este caso así que preferimos hacerlo a
    // mano
    // TutorCentro tutorCentro = modelMapper.map(dto, TutorCentro.class);

    TutorCentro tutorCentro = new TutorCentro();

    Curso curso = cursoService.obtenerCursoPorId(dto.getCursoId());

    final Long usuarioId = dto.getUsuarioId();
    Usuario usuario = usuarioId != null ? usuarioService.obtenerUsuarioPorId(usuarioId) : null;

    tutorCentro.setNombre(dto.getNombre());
    tutorCentro.setApellidos(dto.getApellidos());
    tutorCentro.setEmail(dto.getEmail());
    tutorCentro.setCurso(curso);
    tutorCentro.setUsuario(usuario);
    tutorCentro.setActivo(true);

    return tutorCentro;

  }
}
