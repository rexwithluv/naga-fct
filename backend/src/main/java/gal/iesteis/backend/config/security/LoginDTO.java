package gal.iesteis.backend.config.security;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {
  @NotBlank private String email;

  @NotBlank private String password;
}
