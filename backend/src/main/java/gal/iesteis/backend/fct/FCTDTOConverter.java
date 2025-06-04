package gal.iesteis.backend.fct;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gal.iesteis.backend.alumno.Alumno;
import gal.iesteis.backend.alumno.AlumnoService;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.fct.dto.FCTDTO;
import gal.iesteis.backend.fct.dto.FCTDTOCreate;
import gal.iesteis.backend.fct.dto.FCTDTOResponse;
import gal.iesteis.backend.fct.dto.FCTDTOResponseAdmin;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.tutorEmpresa.TutorEmpresa;
import gal.iesteis.backend.tutorEmpresa.TutorEmpresaService;

@Component
public class FCTDTOConverter {

    private static final Logger logger = LoggerFactory.getLogger(FCTService.class);

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AlumnoService alumnoService;

    @Autowired
    private TutorEmpresaService tutorEmpresaService;

    public FCTDTO fctADtoResponse(FCT fct, boolean isAdmin) {
        if (isAdmin) {
            FCTDTOResponseAdmin dto = modelMapper.map(fct, FCTDTOResponseAdmin.class);

            dto.setAlumno(fct.getAlumno().getNombre());
            dto.setTutorEmpresa(
                    fct.getTutorEmpresa().getNombre() + " " + fct.getTutorEmpresa().getApellidos());
            dto.setEmpresa(fct.getTutorEmpresa().getEmpresa().getNombre());
            TutorCentro tutorAlumno = fct.getAlumno().getTutorCentro();
            dto.setTutorCentro(tutorAlumno.getNombre() + " " + tutorAlumno.getApellidos());

            return dto;
        }
        FCTDTOResponse dto = modelMapper.map(fct, FCTDTOResponse.class);

        dto.setAlumno(fct.getAlumno().getNombre());
        dto.setTutorEmpresa(
                fct.getTutorEmpresa().getNombre() + " " + fct.getTutorEmpresa().getApellidos());
        dto.setEmpresa(fct.getTutorEmpresa().getEmpresa().getNombre());

        return dto;
    }

    public FCT dtoCreateAFct(UserDetailsImpl userDetails, FCTDTOCreate dto) {
        FCT fct = modelMapper.map(dto, FCT.class);

        Alumno alumno = alumnoService.obtenerAlumnoPorId(dto.getAlumnoId());
        TutorEmpresa tutorEmpresa = tutorEmpresaService.obtenerTutorEmpresaPorId(dto.getTutorEmpresaId());

        fct.setId(null); // En ocasiones asigna como id de FCT el id de alumno
        fct.setAlumno(alumno);
        fct.setTutorEmpresa(tutorEmpresa);

        return fct;
    }
}
