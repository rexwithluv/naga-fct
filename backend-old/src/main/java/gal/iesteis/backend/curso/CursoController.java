package gal.iesteis.backend.curso;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cursos")
public class CursoController {
  @Autowired private CursoService service;

  @GetMapping("")
  public ResponseEntity<?> getAll(@RequestParam Optional<Boolean> hasTutorCentro) {
    return ResponseEntity.status(HttpStatus.OK).body(service.getAll(hasTutorCentro));
  }
}
