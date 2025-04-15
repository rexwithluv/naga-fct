package gal.iesteis.backend.config.controllerAdvice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import gal.iesteis.backend.alumno.exceptions.AlumnoForbiddenException;
import gal.iesteis.backend.alumno.exceptions.AlumnoNotFoundException;
import gal.iesteis.backend.empresa.EmpresaForbiddenException;
import gal.iesteis.backend.empresa.EmpresaNotFoundException;
import gal.iesteis.backend.fct.FCTForbiddenException;
import gal.iesteis.backend.fct.FCTNotFoundException;
import gal.iesteis.backend.tutorCentro.TutorCentroForbiddenException;
import gal.iesteis.backend.tutorCentro.TutorCentroNotFoundException;
import gal.iesteis.backend.usuario.UsuarioForbiddenException;
import gal.iesteis.backend.usuario.UsuarioNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneralException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Ocurrió un error inesperado: " + e.getMessage());
    }

    // Alumnos
    @ExceptionHandler(AlumnoNotFoundException.class)
    public ResponseEntity<?> handleAlumnoNotFound(AlumnoNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(AlumnoForbiddenException.class)
    public ResponseEntity<?> handleAlumnoAccessDenied(AlumnoForbiddenException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }

    // Empresas
    @ExceptionHandler(EmpresaNotFoundException.class)
    public ResponseEntity<?> handleEmpresaNotFound(EmpresaNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(EmpresaForbiddenException.class)
    public ResponseEntity<?> handleEmpresaForbidden(EmpresaForbiddenException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }

    // Tutores del centro
    @ExceptionHandler(TutorCentroNotFoundException.class)
    public ResponseEntity<?> handleTutorCentroNotFound(TutorCentroNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(TutorCentroForbiddenException.class)
    public ResponseEntity<?> handleTutorCentroForbidden(TutorCentroForbiddenException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }

    // Usuarios
    @ExceptionHandler(UsuarioNotFoundException.class)
    public ResponseEntity<?> handleUsuarioNotFound(UsuarioNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(UsuarioForbiddenException.class)
    public ResponseEntity<?> handleUsuarioForbidden(UsuarioForbiddenException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }

    // FCTs
    @ExceptionHandler(FCTNotFoundException.class)
    public ResponseEntity<?> handleFCTNotFound(FCTNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(FCTForbiddenException.class)
    public ResponseEntity<?> handleFCTForbidden(FCTForbiddenException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }
}
