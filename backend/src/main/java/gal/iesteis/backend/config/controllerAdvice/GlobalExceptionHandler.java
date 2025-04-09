package gal.iesteis.backend.config.controllerAdvice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import gal.iesteis.backend.alumno.AlumnoForbiddenException;
import gal.iesteis.backend.alumno.AlumnoNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AlumnoForbiddenException.class)
    public ResponseEntity<String> handleAlumnoAccessDenied(AlumnoForbiddenException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(e.getMessage());
    }

    @ExceptionHandler(AlumnoNotFoundException.class)
    public ResponseEntity<String> handleAlumnoNotFound(AlumnoNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Ocurrió un error inesperado");
    }
}
