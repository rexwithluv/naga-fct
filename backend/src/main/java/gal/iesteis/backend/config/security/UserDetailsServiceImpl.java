package gal.iesteis.backend.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import gal.iesteis.backend.usuario.Usuario;
import gal.iesteis.backend.usuario.UsuarioRepository;
import jakarta.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  private UsuarioRepository usuarioRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Usuario usuario = usuarioRepository.findByEmail(email);
    if (usuario == null) {
      throw new UsernameNotFoundException("Usuario no encontrado con email: " + email);
    }
    return UserDetailsImpl.build(usuario);
  }
}
