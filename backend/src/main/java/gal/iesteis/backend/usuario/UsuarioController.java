package gal.iesteis.backend.usuario;

import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.usuario.dto.UsuarioDTOCreate;
import jakarta.validation.Valid;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

  @Autowired private UsuarioService service;

  @GetMapping("")
  public ResponseEntity<?> getAll(@AuthenticationPrincipal UserDetailsImpl userDetails) {
    return ResponseEntity.status(HttpStatus.OK).body(service.obtenerTodos(userDetails));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getById(@PathVariable Long id) {
    return ResponseEntity.status(HttpStatus.OK).body(service.obtenerPorId(id));
  }

  @GetMapping("/yo")
  public ResponseEntity<?> getSelfData(@AuthenticationPrincipal UserDetailsImpl userDetails) {
    return ResponseEntity.status(HttpStatus.OK).body(service.obtenerMisDatos(userDetails));
  }

  @PostMapping("")
  public ResponseEntity<?> createFct(@RequestBody @Valid UsuarioDTOCreate dto) {
    return ResponseEntity.status(HttpStatus.OK).body(service.crearUsuario(dto));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable Long id) {
    service.deleteUsuario(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
