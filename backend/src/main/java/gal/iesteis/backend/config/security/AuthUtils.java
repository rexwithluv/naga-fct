package gal.iesteis.backend.config.security;

public class AuthUtils {

  public static boolean isAdmin(UserDetailsImpl userDetails) {
    return userDetails.getAuthorities().stream()
        .anyMatch(rol -> rol.getAuthority().equals("ROLE_1"));
  }
}
