package gal.iesteis.backend.curso;

import com.fasterxml.jackson.annotation.JsonIgnore;

import gal.iesteis.backend.especialidad.Especialidad;
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
@Table(name = "cursos", uniqueConstraints = {
    @UniqueConstraint(name = "idx_cursos_codigo", columnNames = { "codigo" }),
})
public class Curso {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Short id;

  @Column(name = "codigo", length = 20, nullable = false)
  private String codigo;

  @Column(name = "nombre", length = 500, nullable = false)
  private String nombre;

  @ManyToOne
  @JoinColumn(name = "especialidad_id", nullable = false, foreignKey = @ForeignKey(name = "fk_cursos_especialidad"))
  private Especialidad especialidad;

  @OneToOne(mappedBy = "curso")
  @JsonIgnore
  private TutorCentro tutor;
}
