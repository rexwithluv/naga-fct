package gal.iesteis.backend.config.controllerAdvice;

import gal.iesteis.backend.alumno.exceptions.AlumnoForbiddenException;
import gal.iesteis.backend.alumno.exceptions.AlumnoNotFoundException;
import gal.iesteis.backend.empresa.exceptions.EmpresaForbiddenException;
import gal.iesteis.backend.empresa.exceptions.EmpresaNotFoundException;
import gal.iesteis.backend.fct.exceptions.FCTForbiddenCreateException;
import gal.iesteis.backend.fct.exceptions.FCTForbiddenException;
import gal.iesteis.backend.fct.exceptions.FCTNotFoundException;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroConflictCursoException;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroConflictUsuarioException;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroForbiddenException;
import gal.iesteis.backend.tutorCentro.exceptions.TutorCentroNotFoundException;
import gal.iesteis.backend.tutorEmpresa.exceptions.TutorEmpresaForbiddenCreateException;
import gal.iesteis.backend.usuario.exceptions.UsuarioConflictException;
import gal.iesteis.backend.usuario.exceptions.UsuarioForbiddenException;
import gal.iesteis.backend.usuario.exceptions.UsuarioNotFoundException;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
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

  // Para los @Valid
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ProblemDetail handleValidException(MethodArgumentNotValidException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(
            HttpStatus.BAD_REQUEST, "Uno o más campos de la solicitud son inválidos.");
    problemDetail.setTitle("Los datos no son válidos.");
    problemDetail.setType(URI.create(BASE_URL + "datos-ivalidos"));

    List<Map<String, String>> invalidParams =
        e.getBindingResult().getFieldErrors().stream()
            .map(
                error -> {
                  Map<String, String> errorDetail = new HashMap<>();
                  errorDetail.put("campo", error.getField());
                  errorDetail.put("error", error.getDefaultMessage());
                  return errorDetail;
                })
            .collect(Collectors.toList());
    problemDetail.setProperty("invalid_params", invalidParams);

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

  @ExceptionHandler(TutorCentroConflictUsuarioException.class)
  public ProblemDetail handleTutorCentroConflictUsuario(TutorCentroConflictUsuarioException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
    problemDetail.setTitle("Ya existe un tutor con ese usuario.");
    problemDetail.setType(URI.create(BASE_URL + "tutores-centro/conflicto-usuario"));
    return problemDetail;
  }

  @ExceptionHandler(TutorCentroConflictCursoException.class)
  public ProblemDetail handleTutorCentroConflictCurso(TutorCentroConflictCursoException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
    problemDetail.setTitle("Ya existe un tutor con ese curso.");
    problemDetail.setType(URI.create(BASE_URL + "tutores-centro/conflicto-curso"));
    return problemDetail;
  }

  // Tutores de empresa
  @ExceptionHandler(TutorEmpresaForbiddenCreateException.class)
  public ProblemDetail handleTutorEmpresaForbiddenCreate(TutorEmpresaForbiddenCreateException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.getMessage());
    problemDetail.setTitle("No tienes permiso para crear tutor de empresa.");
    problemDetail.setType(URI.create(BASE_URL + "tutores-empresa/creacion-denegada"));
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

  @ExceptionHandler(UsuarioConflictException.class)
  public ProblemDetail handleUsuarioConflict(UsuarioConflictException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
    problemDetail.setTitle("Ya existe un usuario con estos datos.");
    problemDetail.setType(URI.create(BASE_URL + "usuarios/conflicto"));
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

  @ExceptionHandler(FCTForbiddenCreateException.class)
  public ProblemDetail handleFCTForbiddenCreate(FCTForbiddenCreateException e) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.getMessage());
    problemDetail.setTitle("No tienes permiso para crear FCT.");
    problemDetail.setType(URI.create(BASE_URL + "fct/creacion-denegada"));
    return problemDetail;
  }
}
