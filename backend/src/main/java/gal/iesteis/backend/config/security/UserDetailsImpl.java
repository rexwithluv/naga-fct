package gal.iesteis.backend.config.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import gal.iesteis.backend.usuario.Usuario;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class UserDetailsImpl implements UserDetails {

  private Long id;
  private String email;

  @Getter private Long tutorCentroId;

  @JsonIgnore private String password;
  private Collection<? extends GrantedAuthority> authorities;

  public static UserDetailsImpl build(Usuario usuario) {
    List<GrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().getId()));

    Long tutorCentroId = usuario.getTutor() != null ? usuario.getTutor().getId() : null;

    return new UserDetailsImpl(
        usuario.getId(), usuario.getEmail(), tutorCentroId, usuario.getPassword(), authorities);
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public String getUsername() {
    return email;
  }
}
