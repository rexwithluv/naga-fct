package gal.iesteis.backend.concello;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/concellos")
public class ConcelloController {

  @Autowired private ConcelloService service;

  @GetMapping("")
  public ResponseEntity<?> obtenerConcellos(@RequestParam Optional<String> nombre) {
    return ResponseEntity.status(HttpStatus.OK).body(service.obtenerConcellos(nombre));
  }
}
