package gal.iesteis.backend.config.controllerAdvice;

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
import java.net.URI;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

// RFC 9457 - Estándar moderno sobre el formato de los problemas HTTP, actualización del RFC 7807
@ControllerAdvice
public class GlobalExceptionHandler {

  // Lo ideal sería tener una URL navegable desde un navegador donde podamos
  // específicar los problemas con contexto y explicación para un usuario común.
  private static final String BASE_URL = "https://naga.iesteis.gal/api/error/";

  @ExceptionHandler(Exception.class)
  public ProblemDetail handleGeneralException(Exception e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
    problemDetail.setTitle("Ocurrió un error inesperado.");
    problemDetail.setType(URI.create(BASE_URL + "error-inesperado"));
    return problemDetail;
  }

  // Login
  @ExceptionHandler(BadCredentialsException.class)
  public ProblemDetail handleBadCredentialsException(BadCredentialsException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, e.getMessage());
    problemDetail.setTitle("Credenciales incorrectas.");
    problemDetail.setType(URI.create(BASE_URL + "credenciales-incorrectas"));
    return problemDetail;
  }

  // Alumnos
  @ExceptionHandler(AlumnoNotFoundException.class)
  public ProblemDetail handleAlumnoNotFound(AlumnoNotFoundException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    problemDetail.setTitle("Alumno no encontrado.");
    problemDetail.setType(URI.create(BASE_URL + "alumnos/no-encontrado"));
    return problemDetail;
  }

  @ExceptionHandler(AlumnoForbiddenException.class)
  public ProblemDetail handleAlumnoAccessDenied(AlumnoForbiddenException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.getMessage());
    problemDetail.setTitle("No tienes permiso para ver los datos de este alumno.");
    problemDetail.setType(URI.create(BASE_URL + "alumnos/acceso-denegado"));
    return problemDetail;
  }

  // Empresas
  @ExceptionHandler(EmpresaNotFoundException.class)
  public ProblemDetail handleEmpresaNotFound(EmpresaNotFoundException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    problemDetail.setTitle("Empresa no encontrada.");
    problemDetail.setType(URI.create(BASE_URL + "empresas/no-encontrada"));
    return problemDetail;
  }

  @ExceptionHandler(EmpresaForbiddenException.class)
  public ProblemDetail handleEmpresaForbidden(EmpresaForbiddenException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.getMessage());
    problemDetail.setTitle("No tienes permiso para ver los datos de esta empresa.");
    problemDetail.setType(URI.create(BASE_URL + "empresas/acceso-denegado"));
    return problemDetail;
  }

  // Tutores del centro
  @ExceptionHandler(TutorCentroNotFoundException.class)
  public ProblemDetail handleTutorCentroNotFound(TutorCentroNotFoundException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    problemDetail.setTitle("Tutor del centro no encontrado.");
    problemDetail.setType(URI.create(BASE_URL + "tutores-centro/no-encontrado"));
    return problemDetail;
  }

  @ExceptionHandler(TutorCentroForbiddenException.class)
  public ProblemDetail handleTutorCentroForbidden(TutorCentroForbiddenException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.getMessage());
    problemDetail.setTitle("No tienes permiso para ver los datos de este tutor de centro.");
    problemDetail.setType(URI.create(BASE_URL + "tutores-centro/acceso-denegado"));
    return problemDetail;
  }

  // Usuarios
  @ExceptionHandler(UsuarioNotFoundException.class)
  public ProblemDetail handleUsuarioNotFound(UsuarioNotFoundException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    problemDetail.setTitle("Usuario no encontrado.");
    problemDetail.setType(URI.create(BASE_URL + "usuarios/no-encontrado"));
    return problemDetail;
  }

  @ExceptionHandler(UsuarioForbiddenException.class)
  public ProblemDetail handleUsuarioForbidden(UsuarioForbiddenException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.getMessage());
    problemDetail.setTitle("No tienes permiso para ver los datos de este usuario.");
    problemDetail.setType(URI.create(BASE_URL + "usuarios/acceso-denegado"));
    return problemDetail;
  }

  // FCTs
  @ExceptionHandler(FCTNotFoundException.class)
  public ProblemDetail handleFCTNotFound(FCTNotFoundException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    problemDetail.setTitle("FCT no encontrada.");
    problemDetail.setType(URI.create(BASE_URL + "fct/no-encontrada"));
    return problemDetail;
  }

  @ExceptionHandler(FCTForbiddenException.class)
  public ProblemDetail handleFCTForbidden(FCTForbiddenException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.getMessage());
    problemDetail.setTitle("No tienes permiso para ver los datos de esta FCT.");
    problemDetail.setType(URI.create(BASE_URL + "fct/acceso-denegado"));
    return problemDetail;
  }
}
