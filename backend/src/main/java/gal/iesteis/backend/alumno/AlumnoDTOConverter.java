package gal.iesteis.backend.alumno;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gal.iesteis.backend.alumno.dto.AlumnoDTO;
import gal.iesteis.backend.alumno.dto.AlumnoDTOAdmin;
import gal.iesteis.backend.alumno.dto.AlumnoDTOComun;
import gal.iesteis.backend.concello.Concello;
import gal.iesteis.backend.concello.ConcelloService;
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

    public AlumnoDTOAdmin alumnoADTOAdmin(Alumno alumno) {
        AlumnoDTOAdmin dto = modelMapper.map(alumno, AlumnoDTOAdmin.class);

        dto.setConcello(alumno.getConcello().getNombre());
        dto.setEstado(alumno.getEstado().getNombre());
        dto.setTutorCentro(alumno.getTutorCentro().getNombre() + " " + alumno.getTutorCentro().getApellidos());

        return dto;
    }

    public AlumnoDTOComun alumnoADTOComun(Alumno alumno) {
        AlumnoDTOComun dto = modelMapper.map(alumno, AlumnoDTOComun.class);

        dto.setConcello(alumno.getConcello().getNombre());
        dto.setEstado(alumno.getEstado().getNombre());

        return dto;
    }

    public Alumno DTOComunAAlumno(AlumnoDTO alumnoDTO, Long tutorCentroId) {
        Alumno alumno = modelMapper.map(alumnoDTO, Alumno.class);

        Concello concello = concelloService.obtenerPorNombre(alumnoDTO.getConcello());
        EstadoAlumno estado = estadoAlumnoService.obtenerPorNombre(alumnoDTO.getEstado());
        TutorCentro tutor = tutorCentroRepository.findById(tutorCentroId)
                .orElseThrow(() -> new TutorCentroNotFoundException(tutorCentroId));

        alumno.setConcello(concello);
        alumno.setEstado(estado);
        alumno.setTutorCentro(tutor);

        return alumno;
    }

    public Alumno DTOAdminAAlumno(AlumnoDTO alumnoDTO) {
        Alumno alumno = modelMapper.map(alumnoDTO, Alumno.class);
        return alumno;
    }
}
