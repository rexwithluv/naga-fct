package gal.iesteis.backend.usuario;

import gal.iesteis.backend.rolUsuario.RolUsuario;
import gal.iesteis.backend.tutorCentro.TutorCentro;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "usuarios", uniqueConstraints = {
        @UniqueConstraint(name = "idx_usuarios_email", columnNames = { "email" }),
})
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", length = 500, nullable = false)
    private String email;

    @Column(name = "password", length = 500, nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "rol_id", nullable = false, foreignKey = @ForeignKey(name = "fk_usuarios_rol"))
    private RolUsuario rol;

    @Column(name = "activo", nullable = false)
    private Boolean activo;

    @OneToOne(mappedBy = "usuario")
    private TutorCentro tutor;
}
