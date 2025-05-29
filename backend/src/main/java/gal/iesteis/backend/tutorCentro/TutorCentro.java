package gal.iesteis.backend.tutorCentro;

import gal.iesteis.backend.curso.Curso;
import gal.iesteis.backend.usuario.Usuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(
    name = "tutores_centro",
    uniqueConstraints = {
      @UniqueConstraint(
          name = "idx_tutores_centro_email",
          columnNames = {"email"}),
      @UniqueConstraint(
          name = "idx_tutores_centro_usuario_id",
          columnNames = {"usuario_id"})
    })
public class TutorCentro {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nombre", length = 500, nullable = false)
  private String nombre;

  @Column(name = "apellidos", length = 500, nullable = false)
  private String apellidos;

  @Column(name = "email", length = 500, nullable = false)
  private String email;

  @OneToOne
  @JoinColumn(
      name = "curso_id",
      nullable = false,
      foreignKey = @ForeignKey(name = "fk_tutor_centro_curso"))
  private Curso curso;

  @Column(name = "activo", nullable = false)
  private Boolean activo;

  @OneToOne
  @JoinColumn(
      name = "usuario_id",
      nullable = true,
      foreignKey = @ForeignKey(name = "fk_tutor_centro_usuario_id"))
  private Usuario usuario;
}
