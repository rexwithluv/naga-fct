package gal.iesteis.backend.fct;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gal.iesteis.backend.alumno.AlumnoRepository;
import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;

@Service
public class FCTService {

    @Autowired
    private FCTRepository repository;

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private ModelMapper modelMapper;

    private FCTDTO FCTADTO(FCT fct) {
        FCTDTO dto = modelMapper.map(fct, FCTDTO.class);

        dto.setAlumno(fct.getAlumno().getNombre());
        dto.setTutorEmpresa(fct.getTutorEmpresa().getNombre() + " " + fct.getTutorEmpresa().getApellidos());
        dto.setEmpresa(fct.getTutorEmpresa().getEmpresa().getNombre());

        return dto;
    }

    public List<FCTDTO> obtenerTodas(UserDetailsImpl userDetails) {
        boolean isAdmin = AuthUtils.isAdmin(userDetails);
        List<FCT> fcts = isAdmin ? repository.findAll()
                : repository.findByAlumnoIn(alumnoRepository.findByTutorCentroId(userDetails.getTutorCentroId()));

        return fcts.stream().map(fct -> FCTADTO(fct)).toList();
    }

    public FCTDTO obtenerPorId(UserDetailsImpl userDetails, Long id) {
        FCT fct = repository.findById(id).orElseThrow(() -> new FCTNotFoundException(id));
        boolean isAdmin = AuthUtils.isAdmin(userDetails);
        List<FCT> fcts = isAdmin ? repository.findAll()
                : repository.findByAlumnoIn(alumnoRepository.findByTutorCentroId(userDetails.getTutorCentroId()));

        boolean fctInFcts = fcts.stream().anyMatch(f -> f.getId().equals(id));
        if (!fctInFcts) {
            throw new FCTForbiddenException(id);
        }

        return FCTADTO(fct);
    }
}
