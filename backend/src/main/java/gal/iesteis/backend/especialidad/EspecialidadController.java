package gal.iesteis.backend.especialidad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/especialidades")
public class EspecialidadController {

  @Autowired private EspecialidadService service;

  @GetMapping("")
  public ResponseEntity<?> getAll() {
    return ResponseEntity.status(HttpStatus.OK).body(service.obtenerTodas());
  }
}
