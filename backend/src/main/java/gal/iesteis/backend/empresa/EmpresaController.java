package gal.iesteis.backend.empresa;

import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.empresa.dto.EmpresaDTOCreate;
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

@RestController
@RequestMapping("/empresas")
public class EmpresaController {

  @Autowired private EmpresaService service;

  @GetMapping("")
  public ResponseEntity<?> getAll(@AuthenticationPrincipal UserDetailsImpl userDetails) {
    return ResponseEntity.status(HttpStatus.OK).body(service.obtenerTodas(userDetails));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getById(
      @AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id) {
    return ResponseEntity.status(HttpStatus.OK).body(service.obtenerPorId(userDetails, id));
  }

  @PostMapping("")
  public ResponseEntity<?> createEmpresa(
      @AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody EmpresaDTOCreate dto) {
    return ResponseEntity.status(HttpStatus.OK).body(service.crearEmpresa(userDetails, dto));
  }
}
