package gal.iesteis.backend.skill;

import gal.iesteis.backend.config.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/skills")
public class SkillController {
  @Autowired private SkillService service;

  @GetMapping("")
  public ResponseEntity<?> getAll(@AuthenticationPrincipal UserDetailsImpl userDetails) {
    return ResponseEntity.status(HttpStatus.OK).body(service.obtenerTodas(userDetails));
  }
}
