package gal.iesteis.backend.skill;

import gal.iesteis.backend.especialidad.Especialidad;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "skills")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre", length = 500, nullable = false)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "especialidad_id", nullable = false, foreignKey = @ForeignKey(name = "fk_skills_especialidad"))
    private Especialidad especialidad;
}
