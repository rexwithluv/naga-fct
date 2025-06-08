package gal.iesteis.backend.rolUsuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/roles-usuario")
public class RolUsuarioController {
  @Autowired private RolUsuarioService service;

  @GetMapping("")
  public ResponseEntity<?> obtenerTodos() {
    return ResponseEntity.status(HttpStatus.OK).body(service.obtenerTodos());
  }
}
