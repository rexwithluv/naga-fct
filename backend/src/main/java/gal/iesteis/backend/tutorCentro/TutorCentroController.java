package gal.iesteis.backend.tutorCentro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tutores-centro")
public class TutorCentroController {

    @Autowired
    private TutorCentroService service;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(service.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.obtenerPorId(id));
    }

}
