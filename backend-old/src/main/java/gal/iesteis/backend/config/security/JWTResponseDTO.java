package gal.iesteis.backend.config.security;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JWTResponseDTO {
  private String token;
  private String tokenType;
  private Long id;
  private String email;
  private String rol;
}
