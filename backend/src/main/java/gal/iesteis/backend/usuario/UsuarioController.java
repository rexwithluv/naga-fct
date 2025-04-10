package gal.iesteis.backend.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gal.iesteis.backend.config.security.UserDetailsImpl;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping("")
    public ResponseEntity<?> getAll(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.status(HttpStatus.OK).body(service.obtenerTodos(userDetails));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.obtenerPorId(userDetails, id));
    }

    @GetMapping("/yo")
    public ResponseEntity<?> getSelfData(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.status(HttpStatus.OK).body(service.obtenerMisDatos(userDetails));
    }

}
