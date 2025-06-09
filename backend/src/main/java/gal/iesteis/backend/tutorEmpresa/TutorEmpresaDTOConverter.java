package gal.iesteis.backend.tutorEmpresa;

import gal.iesteis.backend.empresa.Empresa;
import gal.iesteis.backend.tutorEmpresa.dto.TutorEmpresaDTO;
import gal.iesteis.backend.tutorEmpresa.dto.TutorEmpresaDTOCreate;
import gal.iesteis.backend.tutorEmpresa.dto.TutorEmpresaDTOResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TutorEmpresaDTOConverter {

  @Autowired private ModelMapper modelMapper;

  public TutorEmpresaDTO tutorEmpresaADtoResponse(TutorEmpresa tutor) {
    TutorEmpresaDTOResponse dto = modelMapper.map(tutor, TutorEmpresaDTOResponse.class);

    dto.setEmpresa(tutor.getEmpresa().getNombre());

    return dto;
  }

  public TutorEmpresa dtoATutorEmpresa(TutorEmpresaDTOCreate dto, Empresa empresa) {
    TutorEmpresa tutor = modelMapper.map(dto, TutorEmpresa.class);
    tutor.setId(null);
    tutor.setEmpresa(empresa);

    return tutor;
  }
}
