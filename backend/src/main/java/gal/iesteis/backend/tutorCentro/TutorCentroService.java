package gal.iesteis.backend.tutorCentro;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;

@Service
public class TutorCentroService {

    @Autowired
    private TutorCentroRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    private TutorCentroDTO tutorCentroADTO(TutorCentro tutor) {
        TutorCentroDTO dto = modelMapper.map(tutor, TutorCentroDTO.class);

        dto.setCurso(tutor.getCurso().getNombre());

        return dto;
    }

    public List<TutorCentroDTO> obtenerTodos(UserDetailsImpl userDetails) {
        if (!AuthUtils.isAdmin(userDetails)) {
            throw new TutorCentroForbiddenException();
        }

        List<TutorCentro> tutores = repository.findAll();
        return tutores.stream().map(tutor -> tutorCentroADTO(tutor)).toList();
    }

    public TutorCentroDTO obtenerPorId(UserDetailsImpl userDetails, Long id) {
        if (!AuthUtils.isAdmin(userDetails)) {
            throw new TutorCentroForbiddenException();
        }

        TutorCentro tutor = repository.findById(id).orElseThrow(() -> new TutorCentroNotFoundException(id));
        return tutorCentroADTO(tutor);
    }
}
