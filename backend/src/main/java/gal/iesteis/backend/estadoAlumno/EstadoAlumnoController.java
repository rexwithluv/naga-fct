package gal.iesteis.backend.estadoAlumno;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/estados-alumno")
public class EstadoAlumnoController {

  @Autowired private EstadoAlumnoService service;

  @GetMapping("")
  public ResponseEntity<?> getAll() {
    return ResponseEntity.status(HttpStatus.OK).body(service.getAll());
  }
}
