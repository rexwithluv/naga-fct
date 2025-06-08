package gal.iesteis.backend.fct;

import gal.iesteis.backend.config.security.UserDetailsImpl;
import gal.iesteis.backend.fct.dto.FCTDTOCreate;
import jakarta.validation.Valid;
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
@RequestMapping("/fct")
public class FCTController {

  @Autowired private FCTService service;

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
  public ResponseEntity<?> createFct(
      @AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody @Valid FCTDTOCreate dto) {
    return ResponseEntity.status(HttpStatus.OK).body(service.crearFct(userDetails, dto));
  }
}
