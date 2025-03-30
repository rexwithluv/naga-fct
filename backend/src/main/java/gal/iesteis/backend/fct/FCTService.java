package gal.iesteis.backend.fct;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FCTService {

    @Autowired
    private FCTRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    private FCTDTO FCTADTO(FCT fct) {
        FCTDTO dto = modelMapper.map(fct, FCTDTO.class);

        dto.setAlumno(fct.getAlumno().getNombre());
        dto.setTutor(fct.getTutor().getNombre() + " " + fct.getTutor().getApellidos());
        dto.setEmpresa(fct.getTutor().getEmpresa().getNombre());

        return dto;
    }

    public List<FCTDTO> obtenerTodas() {
        List<FCT> fcts = repository.findAll();
        return fcts.stream().map(fct -> FCTADTO(fct)).toList();
    }

    public FCTDTO obtenerPorId(Long id) {
        FCT fct = repository.findById(id).orElseThrow(() -> new FCTNotFoundExcpetion(id));
        return FCTADTO(fct);
    }
}
