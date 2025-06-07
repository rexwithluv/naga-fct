package gal.iesteis.backend.tutorEmpresa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class TutorEmpresaDTOCreate extends TutorEmpresaDTO {
    @NotNull
    private Long empresaId;

    @NotBlank
    private String nombre;

    @NotBlank
    private String apellidos;

    @NotBlank
    private String email;

    @NotBlank
    private String telefono;
}
