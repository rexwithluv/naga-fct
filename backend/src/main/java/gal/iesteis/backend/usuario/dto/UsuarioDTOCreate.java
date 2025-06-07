package gal.iesteis.backend.usuario.dto;

import io.micrometer.common.lang.Nullable;
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
public class UsuarioDTOCreate extends UsuarioDTO {
    @NotBlank
    @Email
    private String email;

    @NotNull
    private Byte rolId;

    @Nullable
    private Long tutorId;
}
