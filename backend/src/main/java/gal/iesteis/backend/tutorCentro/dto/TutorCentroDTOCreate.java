package gal.iesteis.backend.tutorCentro.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TutorCentroDTOCreate extends TutorCentroDTO {
    @NotBlank(message = "El nombre no puede ser nulo.")
    private String nombre;

    @NotBlank(message = "Los apellidos no pueden ser nulos.")
    private String apellidos;

    @NotBlank(message = "El email no puede ser nulo")
    @Email
    private String email;

    @NotNull(message = "El ID de curso no puede ser nulo.")
    private Short cursoId;

    @Nullable
    private Long usuarioId;
}
