package gal.iesteis.backend.config.controllerAdvice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import gal.iesteis.backend.alumno.AlumnoForbiddenException;
import gal.iesteis.backend.alumno.AlumnoNotFoundException;
import gal.iesteis.backend.empresa.EmpresaForbiddenException;
import gal.iesteis.backend.empresa.EmpresaNotFoundException;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import gal.iesteis.backend.tutorCentro.TutorCentroForbiddenException;
import gal.iesteis.backend.tutorCentro.TutorCentroNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneralException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error inesperado");
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

    @ExceptionHandler(TutorCentroNotFoundException.class)
    public ResponseEntity<?> handleTutorCentroNotFound(TutorCentroNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(TutorCentroForbiddenException.class)
    public ResponseEntity<?> handleTutorCentroForbidden(TutorCentroForbiddenException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }

}
