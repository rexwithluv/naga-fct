package gal.iesteis.backend.alumno;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gal.iesteis.backend.alumno.dto.AlumnoDTO;
import gal.iesteis.backend.alumno.dto.AlumnoDTOCreate;
import gal.iesteis.backend.alumno.dto.AlumnoDTOResponse;
import gal.iesteis.backend.alumno.dto.AlumnoDTOResponseAdmin;
import gal.iesteis.backend.concello.Concello;
import gal.iesteis.backend.concello.ConcelloService;
import gal.iesteis.backend.config.security.AuthUtils;
import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.estadoAlumno.EstadoAlumno;
import gal.iesteis.backend.estadoAlumno.EstadoAlumnoService;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.tutorCentro.TutorCentroNotFoundException;
import gal.iesteis.backend.tutorCentro.TutorCentroRepository;

@Component
public class AlumnoDTOConverter {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TutorCentroRepository tutorCentroRepository;

    @Autowired
    private ConcelloService concelloService;

    @Autowired
    private EstadoAlumnoService estadoAlumnoService;

    // Esto está fatal montado pero hasta ahora me parece la forma más sencilla de
    // no andar a dos métodos
    public AlumnoDTO alumnoADTOResponse(Alumno alumno, boolean isAdmin) {
        if (isAdmin) {
            AlumnoDTOResponseAdmin dto = modelMapper.map(alumno, AlumnoDTOResponseAdmin.class);
            dto.setConcello(alumno.getConcello().getNombre());
            dto.setEstado(alumno.getEstado().getNombre());
            dto.setTutorCentro(alumno.getTutorCentro().getNombre() + " " + alumno.getTutorCentro().getApellidos());
            return dto;
        }
        AlumnoDTOResponse dto = modelMapper.map(alumno, AlumnoDTOResponse.class);
        dto.setConcello(alumno.getConcello().getNombre());
        dto.setEstado(alumno.getEstado().getNombre());
        return dto;
    }

    public Alumno DTOCreateAAlumno(AlumnoDTOCreate dto, UserDetailsImpl userDetails) {
        Alumno alumno = modelMapper.map(dto, Alumno.class);
        boolean isAdmin = AuthUtils.isAdmin(userDetails);

        Concello concello = concelloService.obtenerPorId(dto.getConcello());
        EstadoAlumno estado = estadoAlumnoService.obtenerPorId(dto.getEstado());
        TutorCentro tutor = isAdmin
                ? tutorCentroRepository.findById(dto.getTutorCentro())
                        .orElseThrow(() -> new TutorCentroNotFoundException(dto.getTutorCentro()))
                : tutorCentroRepository.findById(userDetails.getTutorCentroId())
                        .orElseThrow(() -> new TutorCentroNotFoundException(userDetails.getTutorCentroId()));

        alumno.setConcello(concello);
        alumno.setEstado(estado);
        alumno.setTutorCentro(tutor);

        return alumno;
    }
}
