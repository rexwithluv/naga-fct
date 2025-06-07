package gal.iesteis.backend.tutorEmpresa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.tutorEmpresa.dto.TutorEmpresaDTOCreate;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/tutores-empresa")
public class TutorEmpresaController {

  @Autowired
  private TutorEmpresaService service;

  @GetMapping("")
  public ResponseEntity<?> getAll(@AuthenticationPrincipal UserDetailsImpl userDetails) {
    return ResponseEntity.status(HttpStatus.OK).body(service.obtenerTodos(userDetails));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getById(@PathVariable Long id) {
    return ResponseEntity.status(HttpStatus.OK).body(service.obtenerPorId(id));
  }

  @PostMapping("")
  public ResponseEntity<?> create(@AuthenticationPrincipal UserDetailsImpl userDetails,
      @RequestBody @Valid TutorEmpresaDTOCreate dto) {
    return ResponseEntity.status(HttpStatus.OK).body(service.crearTutorEmpresa(userDetails, dto));
  }
}
