package gal.iesteis.backend.tutorCentro;

import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.tutorCentro.dto.TutorCentroDTOCreate;
import jakarta.validation.Valid;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tutores-centro")
public class TutorCentroController {

  @Autowired private TutorCentroService service;

  @GetMapping("")
  public ResponseEntity<?> getAll(@AuthenticationPrincipal UserDetailsImpl userDetails) {
    return ResponseEntity.status(HttpStatus.OK).body(service.obtenerTodos(userDetails));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getById(@PathVariable Long id) {
    return ResponseEntity.status(HttpStatus.OK).body(service.obtenerPorId(id));
  }

  @GetMapping("/select")
  public ResponseEntity<?> obtenerParaSelect(@RequestParam Optional<String> nombreTutor) {
    return ResponseEntity.status(HttpStatus.OK).body(service.obtenerTodosSelect(nombreTutor));
  }

  @PostMapping("")
  public ResponseEntity<?> createTutorCentro(@RequestBody @Valid TutorCentroDTOCreate dto) {
    return ResponseEntity.status(HttpStatus.OK).body(service.crearTutorCentro(dto));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(
      @AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id) {
    service.deleteTutorCentro(userDetails, id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
