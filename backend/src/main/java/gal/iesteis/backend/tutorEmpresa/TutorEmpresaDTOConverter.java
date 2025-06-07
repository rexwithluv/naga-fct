package gal.iesteis.backend.tutorEmpresa;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import gal.iesteis.backend.tutorEmpresa.dto.TutorEmpresaDTO;
import gal.iesteis.backend.tutorEmpresa.dto.TutorEmpresaDTOResponse;

@Component
public class TutorEmpresaDTOConverter {

    @Autowired
    private ModelMapper modelMapper;

    public TutorEmpresaDTO tutorEmpresaADtoResponse(TutorEmpresa tutor) {
        TutorEmpresaDTOResponse dto = modelMapper.map(tutor, TutorEmpresaDTOResponse.class);

        dto.setEmpresa(tutor.getEmpresa().getNombre());

        return dto;
    }
}
