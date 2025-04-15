package gal.iesteis.backend.alumno;

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

import gal.iesteis.backend.alumno.dto.AlumnoDTOCreate;
import gal.iesteis.backend.config.security.UserDetailsImpl;

@RestController
@RequestMapping("/alumnos")
public class AlumnoController {

    @Autowired
    private AlumnoService service;

    @GetMapping("")
    public ResponseEntity<?> getAll(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.status(HttpStatus.OK).body(service.obtenerTodos(userDetails));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.obtenerPorId(userDetails, id));
    }

    @PostMapping("")
    public ResponseEntity<?> create(@AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody AlumnoDTOCreate dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crearAlumno(userDetails, dto));
    }

}
